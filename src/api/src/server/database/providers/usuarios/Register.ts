import { IUsuario } from '../../models'
import { database } from '../..'
import { PasswordCrypto } from '../../../shared/services';

export const create = async (
    usuario: Omit<IUsuario, 'id'>
): Promise<Object | Error> => {
    try {
        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha)

        const createdUser =  await database.usuario.create({
            data:{
                ...usuario,
                senha: hashedPassword
            }
        });
        return {
            id: createdUser.id,
            nome: createdUser.nome,
        }
    } catch (error) {
        return Error('Error ao cadastrar o registro')
    } finally {
        await database.$disconnect()
    }
}
