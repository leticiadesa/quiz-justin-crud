let pontos = 0;

if(sessionStorage.getItem("p1") == "01/03/1994"){
    pontos++;
}

if(sessionStorage.getItem("p2") == "espaguete"){
    pontos++;
}

if(sessionStorage.getItem("p3") == "My World"){
    pontos++;
}

if(sessionStorage.getItem("p4") == "15"){
    pontos++;
}

if(sessionStorage.getItem("p5") == "Justin Drew Bieber"){
    pontos++;
}

document.getElementById("pontuacao").innerHTML = `
    ${pontos}/5
`;

let mensagem = "";
let texto = "";

if(pontos == 5){

    mensagem = "Você é 100% Belieber";

    texto = `
    Você conhece MUITO sobre o Justin Bieber.
    Um verdadeiro fã raiz!
    `;

}

else if(pontos >= 3){

    mensagem = "Você conhece bastante";

    texto = `
    Você sabe bastante sobre o Justin,
    mas ainda pode aprender mais.
    `;

}

else{

    mensagem = "Ainda falta treinar";

    texto = `
    Hora de maratonar músicas,
    entrevistas e curiosidades.
    `;

}

document.getElementById("mensagem").innerHTML = mensagem;

document.getElementById("texto").innerHTML = texto;

// SALVAR RESULTADO NO BANCO

const nome = sessionStorage.getItem("nome");
const email = sessionStorage.getItem("email");
const idade = sessionStorage.getItem("idade");
const sexo = sessionStorage.getItem("sexo");

if(!sessionStorage.getItem("resultadoSalvo")){

fetch("http://localhost:3000/resultado", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        nome: nome,
        email: email,
        idade: idade,
        sexo: sexo,
        pontos: pontos,
        total_questoes: 5,
        resultado: mensagem

    })

})
.then(resposta => resposta.json())

.then(dados => {

    console.log(dados);

    if(dados.id){
        sessionStorage.setItem("resultadoSalvo", "1");
    }

})

.catch(erro => {

    console.error(
        "Erro ao salvar resultado:",
        erro
    );

});

}


// JOGAR NOVAMENTE

function jogarNovamente(){

    sessionStorage.clear();

    window.location.href = "1.html";

}