import { IProduto } from '../../models'
import { database } from '../..'

export const create = async (product: Omit<IProduto, 'id'>): Promise<Object | Error> => {

    try {

        return await database.produto.create({
            data: product
        });

    } catch (error) {

        return new Error('Error ao cadastrar o registro')

    } finally {

        await database.$disconnect()

    }

}
