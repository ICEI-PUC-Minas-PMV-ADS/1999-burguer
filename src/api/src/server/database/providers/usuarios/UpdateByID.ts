import { IUpdateUsuario } from '../../models'
import { database } from '../..'

export const updateById = async (
    id: number,
    user: Omit<IUpdateUsuario, 'id'>
): Promise<void | Error> => {
    try {
        const result = await database.usuario.update({
            where: {
                id: Number(id),
            },
            data: {
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                endereco: user.endereco,
                numero: user.numero,
                bairro: user.bairro,
                cidade: user.cidade,
                cep: user.cep,
                uf: user.uf,
                complemento: user.complemento,
                ponto_referencia: user.ponto_referencia,
                telefone: user.telefone,
                funcionario: user.funcionario,
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
