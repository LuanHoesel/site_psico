let inputNome = document.getElementById('nome');
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
            telefone: inputTelefone.value,
        };
        if (contaValida(conta)) {
            salvaContaStorage(conta);
            window.location.href = window.location.href.replace('entrar', 'agenda')
        }
    });
}

if (inputTelefone) {
    inputTelefone.addEventListener('keyup', (evento) => {
        inputTelefone.value = inputTelefone.value.replace(/[^0-9]+/g, '');
        evento.preventDefault();
        evento.stopPropagation();
    });
}

function carregaAgenda() {
    let conta = pegaContaStorage();
    if (!conta) {
        window.location.href = window.location.href.replace('agenda', 'entrar')
    }
}
function carregaEntrar() {
    let conta = pegaContaStorage();
    if (conta) {
        inputNome.value = conta.nome;
        inputTelefone.value = conta.telefone;
    }
}
function contaValida(conta) {
    let temNome = !!conta.nome;
    let temTelefone = !!conta.telefone;
    return temNome && temTelefone;

}