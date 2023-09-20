import { Request, RequestHandler, Response } from 'express'
import * as YUP from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'
import { IUpdateLoja } from '../../database/models'
import { LojasProvider } from '../../database/providers/loja'

interface IParamProps {
    id?: number
}

interface IBodyProps extends Omit<IUpdateLoja, 'id'> {}

export const updateStoreByIdValidation: RequestHandler = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            nome: YUP.string().optional().min(3),
            horario_abertura: YUP.string().optional().min(5),
            horario_fechamento: YUP.string().optional().min(5)
        })
    ),
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0),
        })
    ),
}))

export const updateStoreById = async (
    request: Request<IParamProps, {}, IBodyProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID não informado!',
            },
        })
    }
    const result = await LojasProvider.updateById(
        request.params.id,
        request.body
    )
    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        })
    }
    return response.status(StatusCodes.ACCEPTED).send(result)
}