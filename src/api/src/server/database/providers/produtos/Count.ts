import { database } from '../..'

export const count = async (filter: string | boolean): Promise<number | Error> => {
    try {
        if (typeof filter === 'string') {
            const totalCount = await database.produto.count({
                where: {
                    nome: {
                        contains: filter,
                    }
                }
            })
            if (!totalCount) {
                return new Error('Nenhum registro encontrado')
            }

            return totalCount
        }

        const totalCount = await database.produto.count({
            where: {
                status: {
                    equals: filter,
                }
            }
        })
        if (!totalCount) {
            return new Error('Nenhum registro encontrado')
        }

        return totalCount

    } catch (error) {
        return new Error('Erro ao buscar registros')
    } finally {
        database.$disconnect()
    }
}
