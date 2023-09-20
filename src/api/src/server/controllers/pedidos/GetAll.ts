import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'

interface IQueryProps {
    page?: number
    limit?: number
    filter?: string
}

export const getAllOrdersValidation: RequestHandler = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        YUP.object().shape({
            page: YUP.number().optional().moreThan(0),
            limit: YUP.number().optional().moreThan(0),
            filter: YUP.string().optional(),
        })
    ),
}))

export const getAllOrders = async (
    request: Request<{}, {}, {}, IQueryProps>,
    response: Response
) => {

}