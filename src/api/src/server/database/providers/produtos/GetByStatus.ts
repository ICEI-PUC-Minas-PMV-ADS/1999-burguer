import { IProduto } from '../../models'
import { database } from '../..'

export const getByStatus = async (
    status: string
): Promise<IProduto | Error> => {
    try {
        const result = await database.produto.findUnique({
            where: {
                status: status,
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
        return result
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
