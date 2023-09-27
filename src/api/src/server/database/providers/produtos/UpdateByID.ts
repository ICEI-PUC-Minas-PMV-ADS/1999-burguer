import { IUpdateProduto } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    product: Omit<IUpdateProduto, 'id'>
): Promise<void | Error> => {
    try {
        const result = await database.produto.update({
            where: {
                id: Number(id),
            },
            data: {
                nome: product.nome,
                descricao: product.descricao,
                valor: product.valor,
                status: product.status
            },
        })
        if (!result) {
            return new Error('Registro não encontrado')
        }
    } catch (error) {
        return new Error('Erro ao buscar registro')
    } finally {
        database.$disconnect()
    }
}
