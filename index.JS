//Página de Login
//Criando a função entrar
function entrar(){
    //Obtendo o valor do input de nome
    var nome = document.getElementById("nome").value;

    //Salvando o nome no localStorage
    localStorage.setItem("nome", nome);

    //Redirecionando para a página de boas-vidas
    window.location.href = "home.html";
}


//Página de home
//Criando a função para pegar os dados do locaStorage

const nome = localStorage.getItem("nome");
document.getElementById("Mensagem").textContent ="Bem-vindo, " + nome + "!";


function sair(){

    localStorage.removeItem("nome");
    window.location.href = "login.html"
}
