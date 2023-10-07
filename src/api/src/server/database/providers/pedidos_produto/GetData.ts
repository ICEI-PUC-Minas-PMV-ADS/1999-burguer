import { IPedidoProduto } from '../../models'
import { database } from '../..'

export const getData = async (pedidoId: number): Promise<IPedidoProduto[] | Error> => {

    try {

        const result = await database.pedido_produto.findMany({
            where: {
                pedido_id: Number(pedidoId),
            }
        });
        if (!result || result.length === 0) {

            throw new Error('Produtos do pedido não encontrados');
        }

        return result;

    } catch (error) {

        return new Error('Falha ao buscar registro no banco');

    } finally {

        await database.$disconnect();

    }

}