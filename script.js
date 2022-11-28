let inputNome = document.getElementById('nome');
let inputEmail = document.getElementById('email');
let inputTelefone = document.getElementById('telefone');
let botaoEnviar = document.getElementById('botaoEnviar');
let clienteNome = document.getElementById("clienteNome");

function salvaContaStorage(conta) {
    sessionStorage.setItem('conta', JSON.stringify(conta))
}

function pegaContaStorage() {
    return JSON.parse(sessionStorage.getItem('conta'));
}

if (botaoEnviar) {
    botaoEnviar.addEventListener('click', () => {
        let conta = {
            nome: inputNome.value,
            email: inputEmail.value,
            telefone: inputTelefone.value,
        
        };
        salvaContaStorage(conta);
        window.location.href = window.location.href.replace('login', 'agenda')
    });
}

function carregaAgenda() {
    let conta = pegaContaStorage();
    if(!conta){
        window.location.href = window.location.href.replace('agenda', 'login')
    }
} 
function carregaLogin() {
    let conta = pegaContaStorage();
    if(conta){
        inputNome.value = conta.nome;
        inputEmail.value = conta.email;
        inputTelefone.value = conta.telefone;
    }
}