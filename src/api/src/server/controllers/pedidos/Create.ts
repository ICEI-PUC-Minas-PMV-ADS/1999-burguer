import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IPedido } from '../../database/models';
import { PedidosProvider } from '../../database/providers/pedidos';

interface IBodyProps extends Omit<IPedido, 'id' | 'data_inclusao' | 'data_finalizacao'> { }

export const createPedidoValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            usuario_id: YUP.number().integer().required().moreThan(0),
            total: YUP.number().required().moreThan(0),
            endereco: YUP.string().required().min(2),
            numero: YUP.string().required(),
            bairro: YUP.string().required().min(2),
            cidade: YUP.string().required().min(2),
            cep: YUP.string().required().length(9),
            uf: YUP.string().required().length(2),
            status: YUP.boolean().required()
        })
    )
}))

export const createPedido = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {

    const body = req.body;
    if (!body) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                errors: {
                    default: 'Parâmetros não informados.'
                }
            });

    }

    const result = await PedidosProvider.create(body);
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