import { IPedido } from '../../models';
import { database } from '../..';

export const updateById = async (
    id: number,
    data: Pick<IPedido, 'status'>
): Promise<void | Error> => {
    try {

        const result = await database.pedido.update({
            where: {
                id: Number(id),
            },
            data
        });

        if (!result) {
            throw new Error('Pedido não encontrado!');
        }

    } catch (err) {

        return new Error('Erro ao atualizar pedido');

    } finally {

        await database.$disconnect();

    }

}