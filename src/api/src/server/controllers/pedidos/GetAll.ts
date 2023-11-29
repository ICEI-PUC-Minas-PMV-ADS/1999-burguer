import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosProvider } from '../../database/providers/pedidos';
import { Prisma } from '@prisma/client';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

/* interface iFiltros {
    id?: number;
    status?: number;
    dataInicio?: string;
    dataFim?: string;
} */

export const getAllPedidosValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        YUP.object().shape({
            page: YUP.number().optional().moreThan(0),
            limit: YUP.number().optional().moreThan(0),
            filter: YUP.string().optional()
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

    //const filtros = query.filter ? JSON.parse(query.filter) : null
    const filtros: any = req.query.filter ? JSON.parse(req.query.filter) : { page: 0, limit: 10 };

    const page = Number(filtros.page || 0);
    const limit = Number(filtros.limit || 25);

    const where: Prisma.pedidoWhereInput = {};

    if (filtros.filter) {

        if (filtros.filter.id) where.id = filtros.filter.id;
        if (filtros.filter.status != undefined) where.status = filtros.filter.status;

        if (filtros.filter.dataInicio && filtros.filter.dataFim) where.data_inclusao = { in: [filtros.filter.dataInicio, filtros.dataFim] };
        else if (filtros.filter.dataInicio) where.data_inclusao = { gte: filtros.filter.dataInicio };
        else if (filtros.filter.dataFim) where.data_inclusao = { lte: filtros.filter.dataFim };

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

    const count = !filtros.page ? await PedidosProvider.count(where) : 0;
    if (count instanceof Error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: count.message
                }
            });

    }
    console.log(count)
    const result = { rows, count };
    return res
        .status(StatusCodes.OK)
        .json(result);

}