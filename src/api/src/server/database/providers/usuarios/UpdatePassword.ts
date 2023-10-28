import { database } from '../..';
import { PasswordCrypto } from '../../../shared/services';


export const updatePassword = async ( email: string, password: string): Promise<string | Error> => {
    try {
        const user = await database.usuario.findFirst({
            where:{
                email: email
            }
        })
        const hashedPassword = await PasswordCrypto.hashPassword(password);
        await database.usuario.update({
            where: {
                id: user?.id
            },
            data :{
                senha: hashedPassword
            }
        })
        return 'Senha atualizada'
    } catch (error) {
        return new Error('Erro ao trocar senha')
    }
}