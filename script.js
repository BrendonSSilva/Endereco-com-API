let d = (e) => document.querySelector(e);
d('.cep').addEventListener('focusout', procurar)
function preencher(json) {
    d('.cdd').value = json.localidade
    d('.uf').value = json.uf
    d('.end').value = json.logradouro
    d('.bairro').value = json.bairro
}
var erro = 0
async function procurar() {
    const cep = d('.cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const dados = await fetch(url)
    const json = await dados.json()
    if (json.hasOwnProperty('erro')) {
        if (erro === 0 ) {
            showError('CEP incorreto')
        }
    }
    else {
        clearError()
        preencher(json)
    }
}
function showError(msg) {
    erro = 1
    const local = d('.cep')
    local.style.borderColor = '#ff0000';

    const doc = document.createElement('div');
    doc.classList.add('error')
    doc.innerHTML = msg;
    local.parentElement.insertBefore(doc, local.ElementSimbling);

}
function clearError() {
    erro = 0
    d('.cep').style = ''

    const doc = document.querySelectorAll('.error')
    for (let i = 0; i < doc.length; i++) {
        doc[i].remove();
    }
}