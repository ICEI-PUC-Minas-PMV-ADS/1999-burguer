import { IUsuario } from '../../models'
import { database } from '../..'

export const getData = async (id: number): Promise<IUsuario | Error> => {
    try {
        const result = await database.usuario.findUnique({
            where: {
                id: Number(id),
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
