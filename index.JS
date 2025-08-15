function entrar() {
    const nome = document.getElementById("nome").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const cor = document.getElementById("cor").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const textoExtra = document.getElementById("textoExtra").value.trim();
    const link = document.getElementById("link").value.trim();
    const listaCompras = document.getElementById("listaCompras").value.trim();

    if (!nome || !senha || !cor || !idade || !textoExtra || !link || !listaCompras) {
        alert("Preencha todos os campos!");
        return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("senha", senha);
    localStorage.setItem("cor", cor);
    localStorage.setItem("idade", idade);
    localStorage.setItem("textoExtra", textoExtra);
    localStorage.setItem("link", link);
    localStorage.setItem("listaCompras", listaCompras);

    if (!localStorage.getItem("contadorCliques")) {
        localStorage.setItem("contadorCliques", 0);
    }

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR") + " " + agora.toLocaleTimeString("pt-BR");
    localStorage.setItem("ultimaVisita", dataFormatada);

    window.location.href = "home.html";
}

function sair() {
    localStorage.clear();
    window.location.href = "login.html";
}

window.onload = function () {
    const pagina = window.location.pathname;
    const nome = localStorage.getItem("nome");

    if (nome) {
        document.title = `${nome} - ${document.title}`;
    }

    // =====================
    // Página LOGIN
    // =====================
    if (pagina.includes("login.html")) {
        // Preenche campos se existir no localStorage
        if (nome) document.getElementById("nome").value = nome;
        if (localStorage.getItem("senha")) document.getElementById("senha").value = localStorage.getItem("senha");
        if (localStorage.getItem("cor")) document.getElementById("cor").value = localStorage.getItem("cor");
        if (localStorage.getItem("idade")) document.getElementById("idade").value = localStorage.getItem("idade");
        if (localStorage.getItem("textoExtra")) document.getElementById("textoExtra").value = localStorage.getItem("textoExtra");
        if (localStorage.getItem("link")) document.getElementById("link").value = localStorage.getItem("link");
        if (localStorage.getItem("listaCompras")) document.getElementById("listaCompras").value = localStorage.getItem("listaCompras");

        if (localStorage.getItem("cor")) document.body.style.backgroundColor = localStorage.getItem("cor");

        // Contador
        const botaoContador = document.getElementById("botaoContador");
        botaoContador.addEventListener("click", function() {
            let cliques = parseInt(localStorage.getItem("contadorCliques")) || 0;
            cliques++;
            localStorage.setItem("contadorCliques", cliques);
        });
    }

    // =====================
    // Página HOME
    // =====================
    if (pagina.includes("home.html")) {
        const cor = localStorage.getItem("cor");
        const idade = localStorage.getItem("idade");
        const textoExtra = localStorage.getItem("textoExtra");
        const ultimaVisita = localStorage.getItem("ultimaVisita");
        const link = localStorage.getItem("link");
        const listaCompras = localStorage.getItem("listaCompras");

        if (nome) document.getElementById("Mensagem").textContent = "Bem-vindo, " + nome + "!";
        if (idade) document.getElementById("idadeTexto").textContent = "Sua idade: " + idade;
        if (textoExtra) document.getElementById("textoExtraMostrado").textContent = "Você digitou: " + textoExtra;

        if (cor) document.body.style.backgroundColor = cor;

        let cliques = parseInt(localStorage.getItem("contadorCliques")) || 0;
        document.getElementById("contador").textContent = "Você clicou " + cliques + " vezes.";

        if (ultimaVisita) {
            document.getElementById("ultimaVisita").textContent = "Última visita: " + ultimaVisita;
        }

        // Exibe lista de compras
        if (listaCompras) {
            const listaArray = listaCompras.split(",").map(item => item.trim());
            const ul = document.getElementById("listaComprasMostrada");
            ul.innerHTML = "";
            listaArray.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                ul.appendChild(li);
            });
        }

        // Botão abrir link
        const botaoAbrirLink = document.getElementById("abrirLink");
        if (link) {
            botaoAbrirLink.addEventListener("click", function() {
                window.open(link, "_blank");
            });
        } else {
            botaoAbrirLink.disabled = true;
            botaoAbrirLink.textContent = "Nenhum link salvo";
        }

        // Botão Apagar Lista de Compras
        document.getElementById("apagarLista").addEventListener("click", function() {
            localStorage.removeItem("listaCompras");
            document.getElementById("listaComprasMostrada").innerHTML = "";
            alert("Lista de compras apagada!");
        });
    }

    // =====================
    // Página SENHA
    // =====================
    if (pagina.includes("senha.html")) {
        const senha = localStorage.getItem("senha");
        if (senha) {
            document.getElementById("senhaMostrada").textContent = "Sua senha é: " + senha;
        } else {
            document.getElementById("senhaMostrada").textContent = "Nenhuma senha salva.";
        }
    }
};