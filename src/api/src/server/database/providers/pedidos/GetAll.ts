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
            skip: Math.floor(page * limit),
            take: limit,
            where
        });

        return result;

    } catch (err) {

        return new Error('Erro ao consultar pedidos');

    } finally {

        await database.$disconnect();

    }

}