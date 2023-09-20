
import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Loja - Update', () => {
    it('Deve atualizar o nome de um registro de loja', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ nome: '1999 Burguer - Marajó' })

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof output.body).toEqual('object')
    })

    it('Deve atualizar o horario de abertura de um registro de loja', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ horario_abertura: '19:30' })

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof output.body).toEqual('object')
    })

    it('Deve atualizar o horario de fechamento de um registro de loja', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ horario_fechamento: '21:45' })

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof output.body).toEqual('object')
    })

    it('Deve atualizar um registro de loja passando os três parâmetros', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ nome: '1999 Burguer - Matriz',
                horario_abertura: '20:30',
                horario_fechamento: '02:30'
            })

        expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
        expect(typeof output.body).toEqual('object')
    })

    it('Tenta atualizar um registro de loja com nome muito curto', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ nome: '19' })

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar um registro de loja onde nome é uma string vazia', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ nome: '' })

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.nome')
    })

    it('Tenta criar um registro de loja onde horario de abertura é uma string vazia', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ horario_abertura: '' })

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.horario_abertura')
    })

    it('Tenta criar um registro de loja onde horario de fechamento é uma string vazia', async () => {
        const output = await testServer
            .put('/store-data/1')
            .send({ horario_fechamento: '' })

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.body.horario_fechamento')
    })

    it('Tenta criar um registro de loja com um ID inexistente' , async () => {
        const output = await testServer
            .put('/store-data/99999')

        expect(output.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(output.body).toHaveProperty('errors.default')
    })
})