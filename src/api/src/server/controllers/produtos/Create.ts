import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { IProduct } from '../../database/models';



export const createProductValidation = validation((getSchema) => ({
    body: getSchema<IProduct>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));




// só entra aqui depois do handle request
export const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {

    console.log(req.body);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');

};