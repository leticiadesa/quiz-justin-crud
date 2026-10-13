import { conexao } from "../conexao.js"

// DELETE - remove um resultado pelo id
async function deletarResultado(id) {

    const sql = `DELETE FROM resultados WHERE id = ?`

    const conn = await conexao()

    try {

        const [results] = await conn.query(sql, [id])

        await conn.end()

        return results

    } catch (erro) {

        await conn.end()

        throw erro
    }
}

export { deletarResultado }
