let inputNome = document.getElementById('nome');
let inputEmail = document.getElementById('email');
let botaoEnviar = document.getElementById('botaoEnviar');
let clienteNome = document.getElementById("clienteNome");

function salvaContaStorage(conta) {
    sessionStorage.setItem('conta', JSON.stringify(conta))
}

function pegaContaStorage(conta) {
    return JSON.parse(sessionStorage.getItem('conta'));
}

if (botaoEnviar) {
    botaoEnviar.addEventListener('click', () => {
        let conta = {
            nome: inputNome.value,
            email: inputEmail.value
        };
        salvaContaStorage(conta);
        window.location.href = window.location.href.replace('login', 'agenda')
    });
}

function carregaAgenda() {
    let conta = pegaContaStorage();
    if (conta.nome) {
        clienteNome.innerText = conta.nome
    }
}