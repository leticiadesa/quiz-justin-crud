import { conexao } from "../conexao.js"

async function inserirResultado(infos) {

    const sql = `
        INSERT INTO resultados
        (nome, pontos, total_questoes, resultado)
        VALUES (?, ?, ?, ?)
    `

    const conn = await conexao()

    try {

        const [results] = await conn.query(sql, [
            infos.nome,
            infos.pontos,
            infos.total_questoes,
            infos.resultado
        ])

        await conn.end()

        return results

    } catch (erro) {

        await conn.end()

        throw erro
    }
}

export { inserirResultado }