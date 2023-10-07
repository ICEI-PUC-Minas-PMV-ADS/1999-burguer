import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ProdutosProvider } from '../../database/providers/produtos';
import ProductImg from '../../mongo-database/models/ProductImg';


interface IParamProps {
    id?: number;
}

export const getByProductByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));


// só entra aqui depois do handle request
export const getProductById = async (req: Request<IParamProps>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await ProdutosProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    const produtoImg = await ProductImg.findOne({ product_id: +result['id'] });

    result.imagem = produtoImg?.url;

    return res.status(StatusCodes.OK).json(result);

};