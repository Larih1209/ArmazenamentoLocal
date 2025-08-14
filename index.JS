// Função de login
function entrar() {
    // Captura os valores dos campos do login
    const nome = document.getElementById("nome").value.trim();
    const cor = document.getElementById("cor").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const textoExtra = document.getElementById("textoExtra").value.trim();


    // Validação simples para evitar campos vazios
    if (!nome || !cor || !idade || !textoExtra) {
        alert("Preencha todos os campos!");
        return;
    }


    // Salva todos os dados no localStorage
    localStorage.setItem("nome", nome);
    localStorage.setItem("cor", cor);
    localStorage.setItem("idade", idade);
    localStorage.setItem("textoExtra", textoExtra);


    // Inicializa o contador se ainda não existir
    if (!localStorage.getItem("contadorCliques")) {
        localStorage.setItem("contadorCliques", 0);
    }


    // Redireciona para a página home
    window.location.href = "home.html";
}


// Função de sair (limpa dados e volta ao login)
function sair() {
    localStorage.removeItem("nome");
    localStorage.removeItem("cor");
    localStorage.removeItem("idade");
    localStorage.removeItem("textoExtra");
    localStorage.removeItem("contadorCliques");
    window.location.href = "login.html";
}


// Executa ao carregar a página
window.onload = function () {
    const pagina = window.location.pathname;


    // Página de Login
    if (pagina.includes("login.html")) {
        // Recupera os valores salvos e preenche os campos
        const nome = localStorage.getItem("nome");
        const cor = localStorage.getItem("cor");
        const idade = localStorage.getItem("idade");
        const textoExtra = localStorage.getItem("textoExtra");


        if (nome) document.getElementById("nome").value = nome;
        if (cor) document.getElementById("cor").value = cor;
        if (idade) document.getElementById("idade").value = idade;
        if (textoExtra) document.getElementById("textoExtra").value = textoExtra;


        // Aplica cor de fundo se já foi escolhida
        if (cor) document.body.style.backgroundColor = cor;
    }


    // Página Home
    if (pagina.includes("home.html")) {
        // Recupera os dados salvos
        const nome = localStorage.getItem("nome");
        const cor = localStorage.getItem("cor");
        const idade = localStorage.getItem("idade");
        const textoExtra = localStorage.getItem("textoExtra");


        // Mostra as informações
        if (nome) document.getElementById("Mensagem").textContent = "Bem-vindo, " + nome + "!";
        if (idade) document.getElementById("idadeTexto").textContent = "Sua idade: " + idade;
        if (textoExtra) document.getElementById("textoExtraMostrado").textContent = "Você digitou: " + textoExtra;


        // Aplica a cor de fundo
        if (cor) document.body.style.backgroundColor = cor;


        //  Contador de cliques 
        const botaoContador = document.getElementById("botaoContador");
        const contador = document.getElementById("contador");


        // Pega o valor salvo (ou 0 se não existir)
        let cliques = parseInt(localStorage.getItem("contadorCliques")) || 0;
        contador.textContent = "Você clicou " + cliques + " vezes.";


        // Ao clicar, aumenta o contador e salva
        botaoContador.addEventListener("click", function() {
            cliques++;
            localStorage.setItem("contadorCliques", cliques);
            contador.textContent = "Você clicou " + cliques + " vezes.";
        });
    }
};