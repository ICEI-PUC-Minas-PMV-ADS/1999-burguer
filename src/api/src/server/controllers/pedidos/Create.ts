import { Request, RequestHandler, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as YUP from 'yup'
import { StatusCodes } from 'http-status-codes'
import { IPedido } from '../../database/models';

interface IBodyProps extends Omit<IPedido, 'id'> {}

// export const createOrderValidation: RequestHandler = validation((getSchema) => ({
//     body: getSchema<IBodyProps>(
//         YUP.object().shape({
//             // data_inclusao: YUP.string().required(),
//             // usuario_id: YUP.number().required(),
//             // total: YUP.number().required(),
//             // endereco: YUP.string().required(),
//             // numero: YUP.number().integer().required(),
//             // bairro: YUP.string().required(),
//             // cidade: YUP.string().required(),
//             // cep: YUP.number().required().integer().max(8),
//             // uf: YUP.string().required().max(2),
//             // status: YUP.boolean().required(),
//             // data_finalizacao: YUP.string().required()
//         })
//     ),
// }))

export const createOrder = async (request: Request<{}, {}, IBodyProps>, response: Response) => {

}