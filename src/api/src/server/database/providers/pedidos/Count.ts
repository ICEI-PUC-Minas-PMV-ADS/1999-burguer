import { Prisma } from '@prisma/client';
import { database } from '../..'

export const count = async (
    where: Prisma.pedidoWhereInput
): Promise<number | Error> => {

    try {

        const count = await database.pedido.count({
            where
        });

        return count;

    } catch (err) {

        return new Error(`Erro ao consultar quantidade pedidos`);

    } finally {

        await database.$disconnect();

    }

}