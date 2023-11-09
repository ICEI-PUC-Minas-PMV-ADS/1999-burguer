import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProdutosProvider } from '../../database/providers/produtos';
import ProductImg, { IProductImg } from '../../mongo-database/models/ProductImg';

// só entra aqui depois do handle request
export const getProdutosCardapio = async (req: Request, res: Response) => {

    // const filtros: any = req.query.filter ? JSON.parse(req.query.filter) : { page: 0, limit: 10 };
    
    let where: any = {};

    // if (filtros.filter) {

    //     if (filtros.filter.status !== undefined) {
    //         where.status = {
    //             equals: filtros.filter.status
    //         }
    //     }

    // }

    const result = await ProdutosProvider.getAll(0, 20, where);

    if (result instanceof Error) {

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });

    }

    const allImages: IProductImg[] | null = await ProductImg.find({ product_id: { $in: result.map(x => x.id) } });

    if (allImages?.length) {

        for(const prod of result) {

            const productImg = allImages.find(x => x.product_id == prod.id);

            prod.imagem = productImg?.url;

        }

    }

    return res.status(StatusCodes.OK).json(result);

};