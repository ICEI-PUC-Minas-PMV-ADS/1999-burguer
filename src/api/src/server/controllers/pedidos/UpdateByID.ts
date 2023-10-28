import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IPedido } from '../../database/models';
import { PedidosProvider } from '../../database/providers/pedidos';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Pick<IPedido, 'status'> { }

export const updatePedidoByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0)
        })
    ),
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            status: YUP.number().required()
        })
    )
}))

export const updatePedidoById = async (
    req: Request<IParamsProps, {}, IBodyProps, {}>,
    res: Response
) => {

    const params = req.params;
    const body = req.body;

    if (!body || !params) {

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

    const data: Pick<IPedido, 'status'> = {
        status: body.status
    };

    const result = await PedidosProvider.updateById(+params.id, data);

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