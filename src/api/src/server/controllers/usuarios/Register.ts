import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as YUP from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { IUsuario } from '../../database/models';
import { UsuariosProvider } from '../../database/providers/usuarios';



interface IBodyProps extends Omit<IUsuario, 'id'> {}


export const registerValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        YUP.object().shape({
            email: YUP.string().required().email().min(10),
            senha: YUP.string().required(),
            nome: YUP.string().required().min(5),
            endereco: YUP.string().required().min(2),
            numero: YUP.string().required(),
            bairro: YUP.string().required().min(2),
            cidade: YUP.string().required().min(2),
            cep: YUP.string().required().min(8).max(9),
            uf: YUP.string().required().length(2),
            complemento: YUP.string().optional().min(5).nullable(),
            ponto_referencia: YUP.string().optional().nullable(),
            telefone: YUP.string().required().length(11),
            funcionario: YUP.boolean().required(),
        })
    )
}));

export const register = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UsuariosProvider.create(req.body);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).send(result);
};