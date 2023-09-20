import { IProduto } from '../../models'
import { database } from '../..'
import { Prisma } from '@prisma/client'

export const getAll = async (
    page: number,
    limit: number,
    filter: boolean,
    id = 0
): Promise<IProduto[] | Error> => {
    try {
        page = Number(page)
        limit = Number(limit)

        const skip = (page - 1) * limit
        const where: Prisma.produtoWhereInput = {}

        if (filter) {
            where.status = {
                equals: filter,
            }
        }

        if (id > 0) {
            where.id = id
        }

        const result = await database.produto.findMany({
            skip: skip,
            take: limit,
            where: where,
        })

        if (result.length === 0) {
            throw new Error(
                'Não foram encontrados registros com os filtros atuais'
            )
        }

        return result
    } catch (error) {
        throw new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
