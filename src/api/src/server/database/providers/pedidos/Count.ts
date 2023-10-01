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

    } catch (err: any) {

        return new Error(`${err.message}`);

    } finally {

        await database.$disconnect();

    }

}