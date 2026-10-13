const botoes = document.querySelectorAll("button");

const respostaCorreta = "Justin Drew Bieber";

function responder(valor, botaoClicado){

    sessionStorage.setItem("p5", valor);

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

        window.location.href = "fim.html";

    }, 2000);

}