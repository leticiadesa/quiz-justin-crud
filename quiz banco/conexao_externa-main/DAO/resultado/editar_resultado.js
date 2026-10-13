import { conexao } from "../conexao.js"

// UPDATE - altera nome, pontos e a mensagem de resultado de um registro
async function editarResultado(id, infos) {

    const sql = `
        UPDATE resultados
        SET nome = ?, pontos = ?, resultado = ?
        WHERE id = ?
    `

    const conn = await conexao()

    try {

        const [results] = await conn.query(sql, [
            infos.nome,
            infos.pontos,
            infos.resultado,
            id
        ])

        await conn.end()

        return results

    } catch (erro) {

        await conn.end()

        throw erro
    }
}

export { editarResultado }
