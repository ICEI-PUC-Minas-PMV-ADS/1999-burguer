import { IPedido, IPedidoProduto } from '../../models';
import { database } from '../..';

export const create = async (
    pedido: Omit<IPedido, 'id' | 'data_inclusao'>,
    produtos: Omit<IPedidoProduto, 'id'>[]
): Promise<IPedido | Error> => {

    try {

        const transaction = await database.$transaction(async (prisma) => {

            const pedidoCreate = await prisma.pedido.create({
                data: {
                    usuario: {
                        connect: {
                            id: Number(pedido.usuario_id)
                        }
                    },
                    total: pedido.total,
                    endereco: pedido.endereco,
                    numero: pedido.numero,
                    bairro: pedido.bairro,
                    cidade: pedido.cidade,
                    cep: pedido.cep,
                    uf: pedido.uf,
                    status: 0
                }
            });

            if (!pedidoCreate) {
                throw new Error('Pedido não cadastrado!');
            }

            for(let prod of produtos) {

                const produtoCreate = await prisma.pedido_produto.create({
                    data: {
                        pedido_id: pedidoCreate.id,
                        produto_id: prod.produto_id,
                        quantidade: prod.quantidade,
                        valor_unitario: +prod.valor_unitario,
                        total: prod.total
                    }
                });

                if (!produtoCreate) {
                    throw new Error('Pedido Produto não cadastrado!');
                }

            }

            return pedidoCreate;

        });

        return transaction;

    } catch (err) {
        return new Error(err.message);

    } finally {

        await database.$disconnect();

    }

};
