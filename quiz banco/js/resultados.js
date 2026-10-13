// Endereço da API (conexao_externa-main/index.js)
const API = "http://localhost:3000/resultado";

const lista = document.getElementById("lista");
const aviso = document.getElementById("aviso");

// Evita injeção de HTML ao mostrar nomes digitados pelo usuário
function esc(texto){
    const d = document.createElement("div");
    d.textContent = texto;
    return d.innerHTML;
}

function mostrarAviso(msg, erro = false){
    aviso.textContent = msg;
    aviso.className = erro ? "aviso erro" : "aviso";
}

// ---------- READ: busca os dados no banco e mostra na tela ----------
async function carregar(){

    try{
        const resp = await fetch(API);
        const dados = await resp.json();

        if(!resp.ok){
           mostrarAviso(dados.erro || "Erro no servidor.", true);
           return;
        }

        if(dados.length === 0){
            lista.innerHTML = `<tr><td colspan="5" class="vazio">Nenhum resultado salvo ainda. Jogue o quiz!</td></tr>`;
            return;
        }

        lista.innerHTML = dados.map((r)=>`
            <tr id="linha-${r.id}">
                <td>${r.id}</td>
                <td>${esc(r.nome)}</td>
                <td>${r.pontos}/${r.total_questoes}</td>
                <td>${esc(r.resultado)}</td>
                <td class="acoes">
                    <button class="btn editar" onclick="editar(${r.id})">Editar</button>
                    <button class="btn excluir" onclick="excluir(${r.id})">Excluir</button>
                </td>
            </tr>
        `).join("");

    }
    catch{
        mostrarAviso("Não foi possível carregar os resultados. O servidor está rodando?", true);
    }
}

// ---------- UPDATE: troca a linha por campos editáveis ----------
async function editar(id){

    const resp = await fetch(`${API}/${id}`);
    const r = await resp.json();

    document.getElementById(`linha-${id}`).innerHTML = `
        <td>${r.id}</td>
        <td><input type="text" id="edit-nome" maxlength="50" value="${esc(r.nome).replace(/"/g, "&quot;")}"></td>
        <td><input type="number" id="edit-pontos" min="0" max="5" value="${r.pontos}"></td>
        <td>${esc(r.resultado)}</td>
        <td class="acoes">
            <button class="btn salvar" onclick="salvar(${r.id})">Salvar</button>
            <button class="btn cancelar" onclick="carregar()">Cancelar</button>
        </td>
    `;
}

async function salvar(id){

    const nome = document.getElementById("edit-nome").value;
    const pontos = Number(document.getElementById("edit-pontos").value);

    const resp = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, pontos })
    });

    if(resp.ok){
        mostrarAviso("Resultado atualizado!");
        carregar();
    }
    else{
        const erro = await resp.json();
        mostrarAviso(erro.erro, true);
    }
}

// ---------- DELETE ----------
async function excluir(id){

    if(!confirm("Tem certeza que deseja excluir este resultado?")){
        return;
    }

    const resp = await fetch(`${API}/${id}`, { method: "DELETE" });

    if(resp.ok){
        mostrarAviso("Resultado excluído!");
        carregar();
    }
    else{
        mostrarAviso("Não foi possível excluir.", true);
    }
}

carregar();
