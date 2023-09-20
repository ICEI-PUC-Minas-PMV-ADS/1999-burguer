import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'

interface IParamProps {
    id?: number
}

export const getOrderByIdValidation: RequestHandler = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        YUP.object().shape({
            id: YUP.number().integer().required().moreThan(0),
        })
    ),
}))

export const getOrderById = async (
    request: Request<IParamProps>,
    response: Response
) => {}