const botoes = document.querySelectorAll("button");

const respostaCorreta = "espaguete";

function responder(valor, botaoClicado){

    sessionStorage.setItem("p2", valor);

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

        window.location.href = "3.html";

    }, 2000);

}