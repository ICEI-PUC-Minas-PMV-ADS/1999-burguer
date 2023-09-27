import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import {IProduto } from '../../database/models';
import { ProdutosProvider } from '../../database/providers/produtos';



export const createProductValidation = validation((getSchema) => ({
    body: getSchema<IProduto>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
        nome: yup.string().required().min(5),
        descricao: yup.string().required().min(10),
        valor: yup.number().required().moreThan(0),
        status: yup.boolean().required(),
    }))
}));


// só entra aqui depois do handle request
export const createProduct = async (req: Request<{}, {}, IProduto>, res: Response) => {

    const result = await ProdutosProvider.create(req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }
    return res.status(StatusCodes.CREATED).send(result);

};