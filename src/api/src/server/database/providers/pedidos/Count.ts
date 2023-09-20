import { database } from '../..'

export const count = async (filter: boolean): Promise<number | Error> => {
    try {
        const totalCount = await database.pedido.count({
            where: {
                status: {
                    equals: filter
                },
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
