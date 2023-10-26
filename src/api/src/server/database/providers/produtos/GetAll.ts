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

        const skip = (page - 1) * limit;

        const result = await database.produto.findMany({
            skip: skip,
            take: limit,
            where
        })

        if (!result?.length) throw new Error('Não foram encontrados registros com os filtros atuais');

        return result;

    } catch (error) {

        throw new Error('Erro ao buscar registro')

    } finally {

        await database.$disconnect();

    }

}