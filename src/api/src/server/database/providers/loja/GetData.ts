import { ILoja } from '../../models'
import { database } from '../..'

export const getById = async (id: number): Promise<ILoja | Error> => {
    try {
        const result = await database.loja.findUnique({
            where: {
                id: Number(id),
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
