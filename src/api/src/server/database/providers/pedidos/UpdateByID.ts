import { IPedido } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    order: Omit<IPedido, 'id'>
): Promise<void | Error> => {
    try {
        const result = await database.pedido.update({
            where: {
                id: Number(id),
            },
            data: {
                data_inclusao: order.data_inclusao,
                usuario_id: order.usuario_id,
                total: order.total,
                endereco: order.endereco,
                numero: order.numero,
                bairro: order.bairro,
                cidade: order.cidade,
                cep: order.cep,
                uf: order.uf,
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
