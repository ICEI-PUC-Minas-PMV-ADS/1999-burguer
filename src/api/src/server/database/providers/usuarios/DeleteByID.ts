import { database } from '../..'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await database.usuario.delete({
            where: {
                id: Number(id),
            },
        })
    } catch (error) {
        return Error('Erro ao deletar o registro')
    } finally {
        database.$disconnect()
    }
}
