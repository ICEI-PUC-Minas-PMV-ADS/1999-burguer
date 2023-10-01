import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { PedidosProdutoProvider } from '../../database/providers/pedidos_produto'


interface IParamsProps {
    pedidoId?: number
}

export const getOrderProductsDataValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        YUP.object().shape({
            pedidoId: YUP.number().integer().required().moreThan(0)
        })
    )
}))

export const getOrderProductsData = async (request: Request<IParamsProps>, response: Response) => {
    if (!request.params.pedidoId) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Pedido não informado!'
            }
        })
    }
    const storeData = await PedidosProdutoProvider.getData(request.params.pedidoId)
    if (storeData instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: storeData.message
            }
        })
    }

    return response.status(StatusCodes.OK).json(storeData)
}