console.log("O JavaScript carregou")

const flash_vermelho = document.getElementById("flash_vermelho");

function efeitoVitoria() {
    if (typeof confetti !== 'undefined') {
        confetti({
            angle: 60,
            spread: 55,
            particleCount: 100,
            origin: { x: 0 }
        });
    } else {
        console.error("Biblioteca confetti não carregada");
    }
}

function efeitoDerrota() {
    let count = 0;
    const flash = () => {
        if (count < 6) { // 3 piscadas (on/off)
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

const input_palavra = document.getElementById("Letra")
const botao_envia = document.getElementById("botao_envia")
const botao_jogar = document.getElementById("botao_jogar") 
const botao_reinicia = document.getElementById("botao_reinicia")
const bloqueio = document.getElementById("bloqueio")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let erros = 0



botao_jogar.addEventListener("click", function() {
    bloqueio.style.display = "none"
});


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


const palavras = ["CASA", "CARRO", "ESCOLA", "JAVASCRIPT", "PYTHON", "COMPUTADOR", "TELEFONE", "MESA", "CADEIRA", "JANELA"]
const palavra_sorteada = palavras[Math.floor(Math.random() * palavras.length)]
exibir_palavra();
desenha_forca();

console.log("Palavra sorteada:", palavra_sorteada); 

input_palavra.addEventListener('keydown', function(e) {
    const letra = input_palavra.value;
    if (letra.length > 1 ) {
        console.log("Por favor, insira apenas uma letra.");
        input_palavra.value = ""; 
    }
    if (/^[0-9]$/.test(e.key)){
        e.preventDefault();
        console.log("Por favor, insira apenas letras.");
        input_palavra.value = "";
    }
});

input_palavra.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        botao_envia.click();
    }
});



botao_envia.addEventListener("click", function() {
    const letra = input_palavra.value.toUpperCase(); 
    if (palavra_sorteada.includes(letra)) {        
        console.log("Parabéns! Você acertou uma letra.");
        exibir_letras(letra);
        input_palavra.value = "";
        verificar_vitoria();
    } else {
        console.log("Ops! Essa letra não está na palavra.");
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
            alert("Parabéns! Você venceu!");
            efeitoVitoria();
            setTimeout(() => location.reload(), 3000);
            
        }
    }

    function verificar_derrota(){
        if (erros > 7) {
            alert("Game Over! A palavra era: " + palavra_sorteada);
            efeitoDerrota();
            setTimeout(() => location.reload(), 1000);
        }
    }

    function desenha_forca() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    //base
    ctx.beginPath();
    ctx.moveTo(10, 250);
    ctx.lineTo(150, 250);
    ctx.stroke();

    //poste
    ctx.beginPath();
    ctx.moveTo(30, 250);
    ctx.lineTo(30, 10);
    ctx.stroke();

    //barra horizontal
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(100, 10);
    ctx.stroke();

    //corda
    ctx.beginPath();
    ctx.moveTo(100, 10);
    ctx.lineTo(100, 70);
    ctx.stroke();
    }

    function desenha_boneco(erros) {
    switch(erros) {
        case 1: //cabeça
            ctx.beginPath();
            ctx.arc(100, 90, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case 2: //corpo
            ctx.beginPath();
            ctx.moveTo(100, 110);
            ctx.lineTo(100, 160);
            ctx.stroke();
            break;

        case 3: 
            ctx.beginPath();
            ctx.moveTo(100, 120);
            ctx.lineTo(80, 150);
            ctx.stroke();
            break;

        case 4:
            ctx.beginPath();
            ctx.moveTo(100, 120);
            ctx.lineTo(120, 150);
            ctx.stroke();
            break;

        case 5:
            ctx.beginPath();
            ctx.moveTo(100, 160);
            ctx.lineTo(80, 190);
            ctx.stroke();
            break;
        
        case 6:
            ctx.beginPath();
            ctx.moveTo(100, 160);
            ctx.lineTo(120, 190);
            ctx.stroke();
            break;

        case 7:
            ctx.beginPath();
            ctx.moveTo(90, 85);
            ctx.lineTo(95, 90);
            ctx.stroke();
            ctx.moveTo(95, 85);
            ctx.lineTo(90, 90);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(105, 85);
            ctx.lineTo(110, 90);
            ctx.stroke();
            ctx.moveTo(110, 85);
            ctx.lineTo(105, 90);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(95, 100);
            ctx.lineTo(105, 100);
            ctx.stroke();
            break;

    }
}
botao_reinicia.addEventListener("click", function(){
    exibir_palavra();
    const span_letras_erradas = document.getElementById("letras_erradas")
    span_letras_erradas.textContent = ""
});





