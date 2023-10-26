import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosProvider } from '../../database/providers/pedidos';
import { Prisma } from '@prisma/client';

interface IQueryProps {
    page?: number;
    limit?: number;
    filtros?: iFiltros;
}

interface iFiltros {
    id?: number;
    status?: number;
    dataInicio?: string;
    dataFim?: string;
}

export const getAllPedidosValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        YUP.object().shape({
            page: YUP.number().optional().moreThan(0),
            limit: YUP.number().optional().moreThan(0),
            filtros: YUP.object().optional()
        })
    )
}))

export const getAllPedidos = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
) => {

    const query = req.query;
    if (!query || !Object.keys(query).length) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                errors: {
                    default: 'Parâmetros não informados.'
                }
            });

    }

    const page = Number(query.page || 1);
    const limit = Number(query.limit || 25);

    const where: Prisma.pedidoWhereInput = {};

    if (query.filtros) {

        if (query.filtros.id) where.id = query.filtros.id;
        if (query.filtros.status) where.status = query.filtros.status;

        if (query.filtros.dataInicio && query.filtros.dataFim) where.data_inclusao = { in: [query.filtros.dataInicio, query.filtros.dataFim] };
        else if (query.filtros.dataInicio) where.data_inclusao = { gte: query.filtros.dataInicio };
        else if (query.filtros.dataFim) where.data_inclusao = { lte: query.filtros.dataFim };

    }

    const rows = await PedidosProvider.getAll(page, limit, where);

    if (rows instanceof Error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: rows.message
                }
            });

    }

    const count = page === 1 ? await PedidosProvider.count(where) : 0;

    if (count instanceof Error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: count.message
                }
            });

    }

    const result = { rows, count };
    return res
        .status(StatusCodes.OK)
        .json(result);

}