const botoes = document.querySelectorAll("button");

const respostaCorreta = "01/03/1994";

function responder(valor, botaoClicado){

    sessionStorage.setItem("p1", valor);

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

        window.location.href = "2.html";

    }, 2000);

}