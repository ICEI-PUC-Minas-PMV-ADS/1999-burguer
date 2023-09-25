import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';


interface IParamProps {
    id?: number;
}


export const deleteProductByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));




// só entra aqui depois do handle request
export const deleteProductById = async (req: Request<IParamProps>, res: Response) => {

    console.log(req.params);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');

};