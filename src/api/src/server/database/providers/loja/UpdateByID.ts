import { IUpdateLoja } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    store: Omit<IUpdateLoja, 'id'>
): Promise<void | Error> => {
    try {
        const result = await database.loja.update({
            where: {
                id: Number(id),
            },
            data: {
                nome: store.nome,
                horario_abertura: store.horario_abertura,
                horario_fechamento: store.horario_fechamento,
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        database.$disconnect()
    }
}
