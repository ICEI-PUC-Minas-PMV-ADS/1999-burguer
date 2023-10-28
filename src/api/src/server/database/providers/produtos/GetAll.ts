import { Prisma } from '@prisma/client';

import { IProduto } from '../../models';
import { database } from '../..';

export const getAll = async (
    page: number,
    limit: number,
    where?: any
): Promise<IProduto[] | Error> => {

    try {

        page = Number(page);
        limit = Number(limit);

        const skip = Math.floor(page * limit);

        const result = await database.produto.findMany({
            skip: skip,
            take: limit,
            where
        })

        return result;

    } catch (error) {

        return new Error('Erro ao buscar registro');

    } finally {

        await database.$disconnect();

    }

}