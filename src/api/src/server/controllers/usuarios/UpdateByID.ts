import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from './../../shared/middleware/Validator';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { IUpdateUsuario } from '../../database/models';

interface IParamProps {
    usuarioId?: number
}

interface IBodyProps extends Omit<IUpdateUsuario, 'id'> {}

export const updateProductByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email().min(10),
            senha: yup.string().required(),
            nome: yup.string().required().min(5),
            endereco: yup.string().required().min(2),
            numero: yup.string().required(),
            bairro: yup.string().required().min(2),
            cidade: yup.string().required().min(2),
            cep: yup.string().required(),
            uf: yup.string().required().length(2),
            complemento: yup.string().optional().length(9),
            ponto_referencia: yup.string().optional(),
            telefone: yup.string().required().length(2),
            funcionario: yup.boolean().required(),
        })),
    params: getSchema<IParamProps>(yup.object().shape({
        usuarioId: yup.number().integer().required().moreThan(0),
    })),
}));


export const updateUsuarioById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    if (!req.params.usuarioId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }
    const result = await UsuariosProvider.updateById(req.params.usuarioId, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.ACCEPTED).send(result);

};