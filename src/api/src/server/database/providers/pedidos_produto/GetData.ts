import { IPedidoProduto } from '../../models'
import { database } from '../..'

export const getData = async (pedidoId: number): Promise<IPedidoProduto[] | Error> => {

    try {

        const result = await database.pedido_produto.findMany({
            where: {
                pedido_id: Number(pedidoId),
            }
        });

        if (!result) {
            throw new Error('Produtos do pedido não encontrados');
        }

        return result;

    } catch (err: any) {

        return new Error(`${err.message}`);

    } finally {

        await database.$disconnect();

    }

}