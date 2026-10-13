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

function estrelas(pontos, total){
    let html = "";
    for(let i = 1; i <= total; i++){
        html += `<span class="${i <= pontos ? "on" : ""}">★</span>`;
    }
    return html;
}

function posicaoTexto(n){
    if(n === 1) return "🥇";
    if(n === 2) return "🥈";
    if(n === 3) return "🥉";
    return n + "º";
}

// Números do topo: participantes, média e melhor nota
function atualizarNumeros(dados){

    const total = dados.length;
    const soma = dados.reduce((acc, r) => acc + Number(r.pontos), 0);
    const melhor = total ? Math.max(...dados.map(r => Number(r.pontos))) : 0;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-media").textContent =
        total ? (soma / total).toFixed(1).replace(".", ",") : "0";
    document.getElementById("stat-melhor").textContent = melhor + "/5";
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

        atualizarNumeros(dados);

        if(dados.length === 0){
            lista.innerHTML = `
                <div class="vazio">
                    <strong>🎤</strong>
                    Nenhum resultado salvo ainda. Jogue o quiz!
                </div>`;
            return;
        }

        lista.innerHTML = dados.map((r, i)=>`
            <div class="item ${i === 0 ? "top1" : ""}" id="linha-${r.id}" style="animation-delay:${i * 0.05}s">
                <div class="posicao">${posicaoTexto(i + 1)}</div>
                <div class="avatar">${esc(String(r.nome).trim().charAt(0).toUpperCase())}</div>
                <div class="info">
                    <div class="nome">${esc(r.nome)}</div>
                    <div class="msg">${esc(r.resultado)}</div>
                </div>
                <div class="estrelas">${estrelas(r.pontos, r.total_questoes || 5)}</div>
                <div class="pontos">${r.pontos}/${r.total_questoes || 5}</div>
                <div class="acoes">
                    <button class="btn editar" onclick="editar(${r.id})">Editar</button>
                    <button class="btn excluir" onclick="excluir(${r.id})">Excluir</button>
                </div>
            </div>
        `).join("");

    }
    catch{
        mostrarAviso("Não foi possível carregar os resultados. O servidor está rodando?", true);
    }
}

// ---------- UPDATE: troca o cartão por campos editáveis ----------
async function editar(id){

    const resp = await fetch(`${API}/${id}`);
    const r = await resp.json();

    const linha = document.getElementById(`linha-${id}`);

    linha.classList.add("editando");

    linha.innerHTML = `
        <div class="campo">
            <input type="text" id="edit-nome" maxlength="50" placeholder="Nome" value="${esc(r.nome).replace(/"/g, "&quot;")}">
            <input type="number" id="edit-pontos" min="0" max="5" value="${r.pontos}">
        </div>
        <div class="acoes">
            <button class="btn salvar" onclick="salvar(${r.id})">Salvar</button>
            <button class="btn cancelar" onclick="carregar()">Cancelar</button>
        </div>
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
