console.log("O JavaScript carregou")

const input_palavra = document.getElementById("Letra")
const botao_envia = document.getElementById("botao_envia")
const jogar = document.getElementById("botao_jogar") 

jogar.addEventListener("click", function() {
    console.log("Vamos começar o jogo! Boa sorte!");
});

const palavras = ["CASA", "CARRO", "ESCOLA", "JAVASCRIPT", "PYTHON", "COMPUTADOR", "TELEFONE", "MESA", "CADEIRA", "JANELA"]
const palavra_sorteada = palavras[Math.floor(Math.random() * palavras.length)]

console.log("Palavra sorteada:", palavra_sorteada); 

input_palavra.addEventListener("input", function() {
    const letra = input_palavra.value;
    if (letra.length > 1) {
        console.log("Por favor, insira apenas uma letra.");
        input_palavra.value = ""; 
    }
});

botao_envia.addEventListener("click", function() {
    const letra = input_palavra.value.toUpperCase(); 
    if (palavra_sorteada.includes(letra)) {
        console.log("Parabéns! Você acertou uma letra.");
    } else {
        console.log("Ops! Essa letra não está na palavra.");
    }
});




