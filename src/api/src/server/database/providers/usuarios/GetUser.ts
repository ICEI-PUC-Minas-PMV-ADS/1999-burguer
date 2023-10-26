import { IUsuario } from '../../models'
import { database } from '../..'

export const getUser = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await database.usuario.findFirst({
            where: {
                email: email
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
        return result
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        await database.$disconnect()
    }
}
