import { IPedido } from '../../models';
import { database } from '../..';

export const create = async (
    pedido: Omit<IPedido, 'id'>
): Promise<Object | Error> => {

    try {

        const result = await database.pedido.create({
            data: pedido
        });

        if (!result) {
            throw new Error('Pedido não cadastrado!');
        }

        return result;

    } catch (err) {

        return new Error(`Erro ao cadastrar pedido`);

    } finally {

        await database.$disconnect();

    }

};
