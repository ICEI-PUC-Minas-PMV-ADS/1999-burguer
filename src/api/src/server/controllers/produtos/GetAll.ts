import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ProdutosProvider } from '../../database/providers/produtos';
import ProductImg, { IProductImg } from '../../mongo-database/models/ProductImg';

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllProductValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional(),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional(),
    }))
}));

// só entra aqui depois do handle request
export const getAllProduct = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    const filtros: any = req.query.filter ? JSON.parse(req.query.filter) : { page: 0, limit: 10 };
    
    let where: any = {};

    if (filtros) {

        if (filtros.status !== undefined) {
            where.status = {
                equals: filtros.status
            }
        }

    }

    const result = await ProdutosProvider.getAll(filtros.page, filtros.limit, where);

    const count = !filtros.page ? await ProdutosProvider.count(where) : 0;

    if (result instanceof Error) {

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });

    } else if (count instanceof Error) {

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });

    }

    const allImages: IProductImg[] | null = await ProductImg.find({ product_id: { $in: result.map(x => x.id) } });

    if (allImages?.length) {

        for(const prod of result) {

            const productImg = allImages.find(x => x.product_id == prod.id);

            prod.imagem = productImg?.url;

        }

    }

    return res.status(StatusCodes.OK).json({ rows: result, count });

};