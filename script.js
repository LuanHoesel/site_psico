let inputNome = document.getElementById('nome');
let inputEmail = document.getElementById('email');
let inputTelefone = document.getElementById('telefone');
let inputSenha = document.getElementById('senha');
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
            senha: inputSenha.value,
        
        };
        if (contaValida(conta)) {
            salvaContaStorage(conta);
            window.location.href = window.location.href.replace('login', 'agenda')
        }
    });
}

if(inputTelefone) {
    inputTelefone.addEventListener('keyup', (evento) => {
        inputTelefone.value = inputTelefone.value.replace(/[^0-9]+/g, '');
        evento.preventDefault();
        evento.stopPropagation();
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
function contaValida(conta) {
    let temNome = !!conta.nome;
    let temTelefone = !!conta.telefone;
    let temEmail = !!conta.email;
    let temSenha = !!conta.senha;
    return temNome && temTelefone && temSenha && temEmail;

}