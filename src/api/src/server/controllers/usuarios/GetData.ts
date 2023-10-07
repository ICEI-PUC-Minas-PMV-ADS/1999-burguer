import { Request, RequestHandler, Response } from 'express'
import { validation } from '../../shared/middleware'
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { UsuariosProvider } from '../../database/providers/usuarios'


interface IParamsProps {
    usuarioId?: number
}

export const getUsuariosDataValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        YUP.object().shape({
            usuarioId: YUP.number().integer().required().moreThan(0)
        })
    )
}))

export const getUsuarioData = async (request: Request<IParamsProps>, response: Response) => {
    if (!request.params.usuarioId) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Usuário não informado!'
            }
        })
    }
    const storeData = await UsuariosProvider.getData(request.params.usuarioId)
    if (storeData instanceof Error){
        return response.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: storeData.message
            }
        })
    }

    return response.status(StatusCodes.OK).json(storeData)
}