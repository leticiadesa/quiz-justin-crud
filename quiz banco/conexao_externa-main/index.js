import express from "express"

import { inserirResultado } from "./DAO/resultado/inserir_resultado.js"
import { buscarResultados, buscarResultado } from "./DAO/resultado/buscar_resultado.js"
import { editarResultado } from "./DAO/resultado/editar_resultado.js"
import { deletarResultado } from "./DAO/resultado/deletar_resultado.js"

const app = express()

app.use(express.json())


// Permite que o front-end (Live Server, porta 5501) acesse esta API (porta 3000)
app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }

    next()

})


// Mesma regra de mensagens usada na tela final (js/fim.js)
function classificar(pontos) {

    if (pontos === 5) return "Você é 100% Belieber"

    if (pontos >= 3) return "Você conhece bastante"

    return "Ainda falta treinar"

}


app.get("/", (req, res) => {

    res.json({
        mensagem: "API do Quiz funcionando!"
    })

})


app.post("/resultado", async (req, res) => {

    try {

        const {
            nome,
            email,
            idade,
            sexo,
            pontos,
            total_questoes,
            resultado
        } = req.body


        if (
            !nome ||
            !email ||
            !idade ||
            !sexo ||
            pontos === undefined ||
            !total_questoes ||
            !resultado
        ) {

            return res.status(400).json({
                erro: "Todos os campos são obrigatórios."
            })

        }


        const resposta = await inserirResultado({

            nome: nome,
            email: email,
            idade: idade,
            sexo: sexo,
            pontos: pontos,
            total_questoes: total_questoes,
            resultado: resultado

        })


        res.status(201).json({

            mensagem: "Resultado salvo com sucesso!",

            id: resposta.insertId

        })

    } catch (erro) {

        console.error(erro)

        res.status(500).json({

            erro: "Erro ao salvar resultado."

        })

    }

})


// READ - lista todos os resultados salvos no banco
app.get("/resultado", async (req, res) => {

    try {

        const resultados = await buscarResultados()

        res.json(resultados)

    } catch (erro) {

        console.error(erro)

        res.status(500).json({
            erro: "Erro ao buscar resultados."
        })

    }

})


// READ - busca um resultado pelo id
app.get("/resultado/:id", async (req, res) => {

    try {

        const rows = await buscarResultado(req.params.id)

        if (rows.length === 0) {

            return res.status(404).json({
                erro: "Resultado não encontrado."
            })

        }

        res.json(rows[0])

    } catch (erro) {

        console.error(erro)

        res.status(500).json({
            erro: "Erro ao buscar resultado."
        })

    }

})


// UPDATE - edita nome e pontos de um resultado
app.put("/resultado/:id", async (req, res) => {

    try {

        const nome = String(req.body.nome ?? "").trim()
        const pontos = Number(req.body.pontos)

        if (!nome) {

            return res.status(400).json({
                erro: "Informe o nome."
            })

        }

        if (!Number.isInteger(pontos) || pontos < 0 || pontos > 5) {

            return res.status(400).json({
                erro: "A pontuação deve ser um número inteiro de 0 a 5."
            })

        }

        const resposta = await editarResultado(req.params.id, {

            nome: nome,
            pontos: pontos,
            resultado: classificar(pontos)

        })

        if (resposta.affectedRows === 0) {

            return res.status(404).json({
                erro: "Resultado não encontrado."
            })

        }

        res.json({
            mensagem: "Resultado atualizado com sucesso!"
        })

    } catch (erro) {

        console.error(erro)

        res.status(500).json({
            erro: "Erro ao atualizar resultado."
        })

    }

})


// DELETE - remove um resultado
app.delete("/resultado/:id", async (req, res) => {

    try {

        const resposta = await deletarResultado(req.params.id)

        if (resposta.affectedRows === 0) {

            return res.status(404).json({
                erro: "Resultado não encontrado."
            })

        }

        res.json({
            mensagem: "Resultado excluído com sucesso!"
        })

    } catch (erro) {

        console.error(erro)

        res.status(500).json({
            erro: "Erro ao excluir resultado."
        })

    }

})


app.listen(3000, () => {

    console.log(
        "Servidor rodando em http://localhost:3000"
    )

})