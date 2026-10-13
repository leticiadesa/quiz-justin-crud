import { conexao } from "../conexao.js"

// READ - lista todos os resultados (maior pontuação primeiro)
async function buscarResultados() {

    const sql = `SELECT * FROM resultados ORDER BY pontos DESC, id DESC`

    const conn = await conexao()

    try {

        const [rows] = await conn.query(sql)

        await conn.end()

        return rows

    } catch (erro) {

        await conn.end()

        throw erro
    }
}

// READ - busca um resultado pelo id
async function buscarResultado(id) {

    const sql = `SELECT * FROM resultados WHERE id = ?`

    const conn = await conexao()

    try {

        const [rows] = await conn.query(sql, [id])

        await conn.end()

        return rows

    } catch (erro) {

        await conn.end()

        throw erro
    }
}

export { buscarResultados, buscarResultado }
