import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { PedidosProdutoProvider } from '../../database/providers/pedidos_produto'


interface IParamsProps {
    id?: number
}

export const getOrderProductsDataValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0)
        })
    )
}))

export const getOrderProductsData = async (request: Request<IParamsProps>, response: Response) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID não informado!'
            }
        })
    }
    const storeData = await PedidosProdutoProvider.getData(request.params.id)
    if (storeData instanceof Error){
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: storeData.message
            }
        })
    }

    return response.status(StatusCodes.OK).json(storeData)
}