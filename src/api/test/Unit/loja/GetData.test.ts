
import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Loja - GetData', () => {

    it('Tenta resgatar informações da loja matriz', async() => {
        const output = await testServer
            .get('/store-data/1')
            .send()
        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toHaveProperty('id');
        expect(output.body).toHaveProperty('nome');
        expect(output.body).toHaveProperty('horario_abertura');
        expect(output.body).toHaveProperty('horario_fechamento');
    })

    it('Tenta resgatar informações da loja não existente', async() => {
        const output = await testServer
            .get('/store-data/3')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(output.body).toHaveProperty('errors.default');
    })

    it('Tenta resgatar informações da loja passando um texto', async () => {
        const output = await testServer
            .get('/store-data/loja-matriz')
            .send()
        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.params.id')

    })
})