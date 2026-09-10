//selecionar os elementos

const formulario = document.querySelector("#form-contato");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const assunto = document.querySelector("#assunto");
const mensagem = document.querySelector("#mensagem");
const statusFormulario = document.querySelector("#status-formulario");

const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroAssunto = document.querySelector("#erro-assunto");
const erroMensagem = document.querySelector("#erro-mensagem");

//verificar se o formulario existe

if (!formulario){
    console.log("Formulario não encontrado");
}

//limpar o erro

function limparErro() {
    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroAssunto.textContent = "";
    erroMensagem.textContent = "";
    statusFormulario.textContent = "";

    nome.classList.remove("erro");
    email.classList.remove("erro");
    assunto.classList.remove("erro");
    mensagem.classList.remove("erro");

    nome.removeAttribute("aria-invalid");
    email.removeAttribute("aria-invalid");
    assunto.removeAttribute("aria-invalid");
    mensagem.removeAttribute("aria-invalid");

    statusFormulario.textContent = "";
    statusFormulario.classList.remove("erro");
}

//marcar um campo invalido

function marcarErro(campo, elementoErro, texto){
    elementoErro.textContent = texto;
    campo.classList.add("erro");
    campo.setAttribute("aria-invalid", "true");
}

//validar no submit

formulario.addEventListener(
    "submit", function (event) {
        event.preventDefault();
        limparErro();

        let formularioValido = true;

        if (nome.value.trim() === "") {
            marcarErro(nome, erroNome, "Informe seu nome");
            formularioValido = false;
        }

        if (email.value.trim() === "") {
            marcarErro(email, erroEmail, "Informe seu email");
            formularioValido = false;
        }

        if (assunto.value.trim() === "") {
            marcarErro(assunto, erroAssunto, "Informe o assunto");
            formularioValido = false;
        }

        if (mensagem.value.trim() === "") {
            marcarErro(mensagem, erroMensagem, "Informe a mensagem");
            formularioValido = false;
        }

        if (formularioValido) {
            statusFormulario.textContent = "Revise os campos destacados";
            statusFormulario.classList.add("erro");
            return;
        }

        statusFormulario.textContent = "Mensagem enviada com sucesso!";
        statusFormulario.classList.add("sucesso");

        formulario.reset();
    }
)