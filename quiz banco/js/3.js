const botoes = document.querySelectorAll("button");

const respostaCorreta = "My World";

function responder(valor, botaoClicado){

    sessionStorage.setItem("p3", valor);

    botoes.forEach((botao)=>{

        botao.disabled = true;

        if(botao.innerText.trim() == respostaCorreta){

            botao.classList.add("correta");

        }

        else{

            botao.classList.add("errada");

        }

    });

    setTimeout(()=>{

        window.location.href = "4.html";

    }, 2000);

}