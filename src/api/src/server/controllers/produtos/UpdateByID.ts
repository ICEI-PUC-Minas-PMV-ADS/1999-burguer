import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { ProdutosProvider } from '../../database/providers/produtos';
import { IUpdateProduto } from '../../database/models';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUpdateProduto, 'id'> {}

export const updateProductByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().optional().min(5),
        descricao: yup.string().optional().min(10),
        valor: yup.number().optional().moreThan(0),
        status: yup.boolean().optional(),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


export const updateProductById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await ProdutosProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
};

