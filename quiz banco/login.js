function registrarUsuario() {

    const mensagem = document.getElementById("mensagem");

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = Number(document.getElementById("idade").value);

    const sexoSelecionado = document.querySelector(
        'input[name="sexo"]:checked'
    );

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (nome.length < 3) {

        mensagem.innerText = "Digite seu nome completo (mínimo 3 letras).";

        return;
    }

    if (!emailValido) {

        mensagem.innerText = "Digite um e-mail válido, como nome@exemplo.com.";

        return;
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {

        mensagem.innerText = "Digite uma idade válida, entre 1 e 120.";

        return;
    }

    if (!sexoSelecionado) {

        mensagem.innerText = "Selecione uma opção de sexo.";

        return;
    }

    mensagem.innerText = "";

    // começa uma partida nova, sem a marca da anterior
    sessionStorage.removeItem("resultadoSalvo");

    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idade", idade);
    sessionStorage.setItem("sexo", sexoSelecionado.value);

    window.location.href = "./html/1.html";
}