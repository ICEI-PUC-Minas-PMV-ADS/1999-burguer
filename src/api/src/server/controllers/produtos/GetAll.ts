import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ProdutosProvider } from '../../database/providers/produtos';

interface IQueryProps {
    id?: number,
    page?: number,
    limit?: number,
    filter?: boolean
}


export const getAllProductValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional(),
        id: yup.number().integer().optional().default(0),
        filter: yup.boolean().optional(),
    }))
}));




// só entra aqui depois do handle request
export const getAllProduct = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    const result = await ProdutosProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || true , Number(req.query.id));
    const count = await ProdutosProvider.count(req.query.filter || true);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};