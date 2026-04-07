console.log("O JavaScript carregou")

const input_palavra = document.getElementById("Letra")
const botao_envia = document.getElementById("botao_envia")
const botao_jogar = document.getElementById("botao_jogar") 
const botao_reinicia = document.getElementById("botao_reinicia")
const bloqueio = document.getElementById("bloqueio")




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
    } 
    });

botao_reinicia.addEventListener("click", function(){
    exibir_palavra();
    const span_letras_erradas = document.getElementById("letras_erradas")
    span_letras_erradas.textContent = ""
});





