import { IPedidoProduto } from '../../models';
import { database } from '../..';

export const create = async (
    pedidoProduto: Omit<IPedidoProduto, 'id' | 'data_inclusao'>
): Promise<IPedidoProduto | Error> => {

    try {
        const result = await database.pedido_produto.create({
            data: {
                pedido_id: pedidoProduto.pedido_id,
                produto_id: pedidoProduto.produto_id,
                quantidade: pedidoProduto.quantidade,
                valor_unitario: pedidoProduto.valor_unitario,
                total: pedidoProduto.total
            }
        });

        if (!result) {
            throw new Error('Pedido Produto não cadastrado!');
        }

        return result;

    } catch (err) {
        return new Error('Erro ao cadastrar Pedido Produto');

    } finally {

        await database.$disconnect();

    }

};
