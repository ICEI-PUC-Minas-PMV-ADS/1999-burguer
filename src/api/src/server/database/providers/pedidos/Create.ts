import { IPedido } from '../../models'
import { database } from '../..'

export const create = async (
    order: Omit<IPedido, 'id'>
): Promise<Object | Error> => {
    try {
        const createdPedido = await database.pedido.create({
            data: order,
        })
        return createdPedido
    } catch (error) {
        return Error('Error ao cadastrar o registro')
    } finally {
        await database.$disconnect()
    }
}
