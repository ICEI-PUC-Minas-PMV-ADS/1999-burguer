import { IPedidoProduto } from '../../models'
import { database } from '../..'

export const getData = async (id: number): Promise<IPedidoProduto | Error> => {
    try {
        const result = await database.pedido_produto.findUnique({
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
