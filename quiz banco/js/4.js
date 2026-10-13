const botoes = document.querySelectorAll("button");

const respostaCorreta = "15";

function responder(valor, botaoClicado){

    sessionStorage.setItem("p4", valor);

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

        window.location.href = "5.html";

    }, 2000);

}