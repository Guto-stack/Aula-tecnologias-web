console.log("O JavaScript carregou")

const flash_vermelho = document.getElementById("flash_vermelho");


let palavra_gerada = false;
const input_palavra = document.getElementById("Letra")
const botao_envia = document.getElementById("botao_envia")
const botao_reinicia = document.getElementById("botao_reinicia")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const offset = (canvas.width - 140) / 2;
let palavra_sorteada = "";

let letras_inseridas = [];
let erros = 0

function mostrarGameOver(mensagem) {
    Toastify({
        text: mensagem,
        duration: -1,
        gravity: "middle",
        position: "center",
        style: {
            background: "red",
            fontSize: "20px",
            padding: "20px 40px",
            borderRadius: "20px"
        },
    }).showToast();
}

function informaUser(mensagem) {
    Toastify({
        text: mensagem,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "orange",
            fontSize: "20px",
            padding: "20px 40px",
            borderRadius: "20px"
        },
    }).showToast();
}

function mostrarVitoria(mensagem) {
    Toastify({
        text: mensagem,
        duration: -1,
        gravity: "middle",
        position: "center",
        style: {
            background: "green",
            fontSize: "20px",
            padding: "20px 40px",
            borderRadius: "20px"
        },
    }).showToast();
}

function efeitoVitoria() {
    if (typeof confetti !== 'undefined') {
        confetti({
            angle: 60,
            spread: 200,
            particleCount: 250,
            origin: { x: 0, y: 1}
        });
        confetti({
            angle: 120,
            spread: 200,
            particleCount: 250,
            origin: { x: 1, y: 1}
        });
    } else {
        console.error("Biblioteca confetti não carregada");
    }
}

function efeitoDerrota() {
    let count = 0;
    const flash = () => {
        if (count < 6) { 
            if (count % 2 === 0) {
                flash_vermelho.classList.add("flash_vermelho");
            } else {
                flash_vermelho.classList.remove("flash_vermelho");
            }
            count++;
            setTimeout(flash, 200);
        } else {
            flash_vermelho.classList.remove("flash_vermelho");
        }
    };
    flash();
}

function encerrarInterface(){
    input_palavra.style.display = "none";
    botao_envia.style.display = "none";
    botao_reinicia.style.display = "inline-block";
}

function letra_errada() {
    const span = document.getElementById("letras_erradas")
    span.style.color = "red"
    span.textContent += input_palavra.value.toUpperCase() + " "

}

function exibir_palavra() {
    const span = document.getElementById("palavra")
    span.textContent = "_ ".repeat(palavra_sorteada.length)
}

function exibir_letras(letra) {
    const span = document.getElementById("palavra")
    if (palavra_sorteada.includes(letra)) {
        let nova_exibicao = ""
        for (let i = 0; i < palavra_sorteada.length; i++) {
            if (palavra_sorteada[i] === letra) {
                nova_exibicao += letra + " "
            } else {
                nova_exibicao += span.textContent[i * 2] + " "
            }
        }
        span.textContent = nova_exibicao
    }
}

function pegaPalavra_API() {
    fetch("https://api.dicionario-aberto.net/random")
        .then(response => response.json())
        .then(data => {
            palavra_sorteada = data.word.toUpperCase();
            
            palavra_sorteada = palavra_sorteada.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, '');
            


            console.log("Palavra sorteada:", palavra_sorteada);
            palavra_gerada = true;
        });

}

informaUser("A palavra pode conter cedilha. Boa sorte!")

pegaPalavra_API();
async function esperarPalavra() {
    while (!palavra_gerada) {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
}
esperarPalavra().then(() => { 
exibir_palavra();
});

desenha_forca();

console.log("Palavra sorteada:", palavra_sorteada); 

input_palavra.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ-]/g, "").toUpperCase();
});

input_palavra.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        botao_envia.click();
    }
});

botao_reinicia.addEventListener("click", function(){
    location.reload();
});

botao_envia.addEventListener("click", function() {
    const letra = input_palavra.value;

    if(!letra) return;

    if(letras_inseridas.includes(letra)){
        Toastify({
            text: "Você já tentou a letra " + letra,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "orange",
                fontSize: "20px",
                padding: "20px 40px",
                borderRadius: "20px"
            },
        }).showToast();

        input_palavra.value = "";
        return;
    }

    letras_inseridas.push(letra);

    if (palavra_sorteada.includes(letra)) {        
        exibir_letras(letra);
        input_palavra.value = "";
        verificar_vitoria();
    } else {
        letra_errada();
        input_palavra.value = "";
        erros++;
        desenha_boneco(erros);
        verificar_derrota();
    } 
    });

    function verificar_vitoria(){
    const span = document.getElementById("palavra")
        if (!span.textContent.includes("_")) {
            mostrarVitoria("Parabéns! Você venceu");
            efeitoVitoria();
            encerrarInterface()
        }
    }

    function verificar_derrota(){
        if (erros >= 7) {
           mostrarGameOver("Game Over! A palavra era: " + palavra_sorteada);
            efeitoDerrota();
            encerrarInterface()
        }
    }

    function desenha_forca() {
    setTimeout(() => {}, 3000); // Espera 1 segundo para garantir que a palavra foi carregada
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;

    //base
    ctx.beginPath();
    ctx.moveTo(10 + offset, 250);
    ctx.lineTo(150 + offset, 250);
    ctx.stroke();

    //poste
    ctx.beginPath();
    ctx.moveTo(30 + offset, 250);
    ctx.lineTo(30 + offset, 10);
    ctx.stroke();

    //barra horizontal
    ctx.beginPath();
    ctx.moveTo(30 + offset, 10);
    ctx.lineTo(100 + offset, 10);
    ctx.stroke();

    //corda
    ctx.beginPath();
    ctx.moveTo(100 + offset, 10);
    ctx.lineTo(100 + offset, 70);
    ctx.stroke();
    }

    function desenha_boneco(erros) {
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 3;
        switch(erros) {
            case 1: //cabeça
                ctx.beginPath();
                ctx.arc(100 + offset, 90, 20, 0, Math.PI * 2);
                ctx.stroke();
                break;

            case 2: //corpo
                ctx.beginPath();
                ctx.moveTo(100 + offset, 110);
                ctx.lineTo(100 + offset, 160);
                ctx.stroke();
                break;

            case 3: 
                ctx.beginPath();
                ctx.moveTo(100 + offset, 120);
                ctx.lineTo(80 + offset, 150);
                ctx.stroke();
                break;

            case 4:
                ctx.beginPath();
                ctx.moveTo(100 + offset, 120);
                ctx.lineTo(120 + offset, 150);
                ctx.stroke();
                break;

            case 5:
                ctx.beginPath();
                ctx.moveTo(100 + offset, 160);
                ctx.lineTo(80 + offset, 190);
                ctx.stroke();
                break;
            
            case 6:
                ctx.beginPath();
                ctx.moveTo(100 + offset, 160);
                ctx.lineTo(120 + offset, 190);
                ctx.stroke();
                break;

            case 7:
                ctx.beginPath();
                ctx.moveTo(90 + offset, 85);
                ctx.lineTo(95 + offset, 90);
                ctx.stroke();
                ctx.moveTo(95 + offset, 85);
                ctx.lineTo(90 + offset, 90);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(105 + offset, 85);
                ctx.lineTo(110 + offset, 90);
                ctx.stroke();
                ctx.moveTo(110 + offset, 85);
                ctx.lineTo(105 + offset, 90);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(95 + offset, 100);
                ctx.lineTo(105 + offset, 100);
                ctx.stroke();
                break;
    }
}