import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await database.usuario.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: '**',
                email: '**',
            }
        })
    } catch (error) {
        return Error('Erro ao deletar o registro')
    } finally {
        database.$disconnect()
    }
}
