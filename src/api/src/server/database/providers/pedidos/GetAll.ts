import { Prisma } from '@prisma/client';
import { IPedido } from '../../models';
import { database } from '../..';

export const getAll = async (
    page: number,
    limit: number,
    where: Prisma.pedidoWhereInput
): Promise<IPedido[] | Error> => {

    try {

        const result = await database.pedido.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where
        });

        if (!result) {
            throw new Error('Pedidos não encontrados!');
        }

        return result;

    } catch (err: any) {

        return new Error(`${err.message}`);

    } finally {

        await database.$disconnect();

    }

}