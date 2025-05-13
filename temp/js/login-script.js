/*CONSTANTES DA TROCA DE LADO DO CONTAINER*/
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

/*EVENTO DE CLIQUE PARA ADICIONAR O STATUS DE "ATIVO" DO CONTAINER*/
registerBtn.addEventListener('click', ()=>{
    container.classList.add("active");
});

/*EVENTO DE CLIQUE PARA REMOVER O STATUS DE "ATIVO" DO CONTAINER*/
loginBtn.addEventListener('click', ()=>{
    container.classList.remove("active");
});

/*CONSTANTES DA TROCA DE VISIBILIDADE DA SENHA NA TELA DE CADASTRO*/
const $passwordUp = document.getElementById('txtSenhaUp');
const $togglerUp = document.getElementById('tpEyeUp');

/*MÉTODO DE TROCA DE VISIBILIDADE DA SENHA NA TELA DE CADASTRO*/
const showHidePasswordUp = () => {
    if ($passwordUp.type == 'password'){
        $passwordUp.setAttribute('type', 'text');
    }
    else {
        $passwordUp.setAttribute('type', 'password',);
    }

    $togglerUp.classList.toggle('fa-eye');
    $togglerUp.classList.toggle('fa-eye-slash');
};

/*EVENTO DE CLIQUE PARA ATIVAR O MÉTODO*/
$togglerUp.addEventListener(
    'click', showHidePasswordUp,
);

/*CONSTANTES DA TROCA DE VISIBILIDADE DA SENHA NA TELA DE LOGIN*/
const $passwordIn = document.getElementById('txtSenhaIn');
const $togglerIn = document.getElementById('tpEyeIn');

/*MÉTODO DE TROCA DE VISIBILIDADE DA SENHA NA TELA DE CADASTRO*/
const showHidePasswordIn = () => {
    if ($passwordIn.type == 'password'){
        $passwordIn.setAttribute('type', 'text');
    }
    else {
        $passwordIn.setAttribute('type', 'password',);
    }

    $togglerIn.classList.toggle('fa-eye');
    $togglerIn.classList.toggle('fa-eye-slash');
};

/*EVENTO DE CLIQUE PARA ATIVAR O MÉTODO*/
$togglerIn.addEventListener(
    'click', showHidePasswordIn,
);

/*IDENTIFICA SE ALGO FOI DIGITADO DENTRO DE ALGUM INPUT E MUDA A COR DO ICONE AO LADO DO INPUT*/
document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll(".inputstxt input");

    inputs.forEach(input => {
        let icon = input.closest(".inputstxt").querySelector("i");

        if (icon) {
            input.addEventListener("input", function () {
                icon.style.color = this.value.length > 0 ? "black" : "#919191";
            });
        }
    });
});

/*FUNÇÃO PARA CADASTRAR USUÁRIOS NO BANCO DE DADOS*/
function cadastrarUsuario(){
    txtNome = document.getElementById("txtNome");
    nome = txtNome.value;
    if(nome == "")/*SE O NOME FOR VAZIO*/
    {
        alert("O NOME DEVE SER PREENCHIDO!")
    }
    else
    {
        txtUsuario = document.getElementById("txtUsuario");
        usuario = txtUsuario.value;
        if(usuario == "")/*SE O USUÁRIO FOR VAZIO*/
        {
            alert("O USUÁRIO DEVE SER PREENCHIDO!")
        }
        else
        {
            txtEmail = document.getElementById("txtEmailUp");
            email = txtEmail.value;
            if(email == "")/*SE O E-MAIL FOR VAZIO*/
            {
                alert("O EMAIL DEVE SER PREENCHIDO!")
            }
            else
            {
                txtSenha = document.getElementById("txtSenhaUp");
                senha = txtSenha.value
                if(senha == "")
                {
                    alert("A SENHA DEVE SER PREENCHIDA!")
                }
                else/*CÓDIGO DO CADASTRO*/
                {

                }
            }
        }
    }
    
}

function logarUsuario(){
    txtEmail = document.getElementById("txtEmailIn");
    email = txtEmail.value;
    if(email == "")/*SE O E-MAIL FOR VAZIO*/
    {
        alert("O EMAIL DEVE SER PREENCHIDO!")
    }
    else
    {
        txtSenha = document.getElementById("txtSenhaIn");
        senha = txtSenha.value
        if(senha == "")
        {
            alert("A SENHA DEVE SER PREENCHIDA!")
        }
        else/*CÓDIGO DO LOGIN*/
        {
            
        }
    }
}