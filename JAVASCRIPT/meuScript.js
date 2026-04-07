console.log("O JavaScript carregou")

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
    } else {
        console.log("Ops! Essa letra não está na palavra.");
        letra_errada();
        input_palavra.value = "";
        erros++;
        desenha_boneco(erros);
    } 
    });

    function desenha_forca() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    //base
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(150, 190);
    ctx.stroke();

    //poste
    ctx.beginPath();
    ctx.moveTo(30, 190);
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
    ctx.lineTo(100, 50);
    ctx.stroke();
    }

    function desenha_boneco(erros) {
    switch(erros) {
        case 1: //cabeça
            ctx.beginPath();
            ctx.arc(100, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case 2: //corpo
            ctx.beginPath();
            ctx.moveTo(100, 90);
            ctx.lineTo(100, 140);
            ctx.stroke();
            break;

        case 3: 
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.lineTo(80, 120);
            ctx.stroke();
            break;

        case 4:
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.lineTo(120, 120);
            ctx.stroke();
            break;

        case 5:
            ctx.beginPath();
            ctx.moveTo(100, 140);
            ctx.lineTo(80, 170);
            ctx.stroke();
            break;
        
        case 6:
            ctx.beginPath();
            ctx.moveTo(100, 140);
            ctx.lineTo(120, 170);
            ctx.stroke();
            break;

        case 7:
            ctx.beginPath();
            ctx.moveTo(90, 65);
            ctx.lineTo(95, 70);
            ctx.stroke();
            ctx.moveTo(95, 65);
            ctx.lineTo(90, 70);
            ctx.stroke();
            break;

    }
}
botao_reinicia.addEventListener("click", function(){
    exibir_palavra();
    const span_letras_erradas = document.getElementById("letras_erradas")
    span_letras_erradas.textContent = ""
});





