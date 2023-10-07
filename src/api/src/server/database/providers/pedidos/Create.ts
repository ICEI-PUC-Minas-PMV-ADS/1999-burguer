import { IPedido } from '../../models';
import { database } from '../..';

export const create = async (
    pedido: Omit<IPedido, 'id' | 'data_inclusao'>
): Promise<Object | Error> => {

    try {
        const result = await database.pedido.create({
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
                status: pedido.status
            }
        });

        if (!result) {
            throw new Error('Pedido não cadastrado!');
        }
        return result;

    } catch (err) {
        return new Error('Erro ao cadastrar pedido');

    } finally {

        await database.$disconnect();

    }

};
