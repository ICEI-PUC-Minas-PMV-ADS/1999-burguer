import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup';
import { StatusCodes } from 'http-status-codes';
import { PedidosProvider } from '../../database/providers/pedidos';

interface IParamProps {
    id?: number
}

export const getPedidoByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0)
        })
    )
}))

export const getPedidoById = async (
    req: Request<IParamProps>,
    res: Response
) => {

    const params = req.params;

    if (!params) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                errors: {
                    default: 'Parâmetros não informados.'
                }
            });

    }

    if (!params.id) {

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                errors: {
                    default: 'Pedido não informado.'
                }
            });

    }

    const result = await PedidosProvider.getById(params.id);

    if (result instanceof Error) {

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: result.message
                }
            });

    }

    return res
        .status(StatusCodes.OK)
        .json(result);

}