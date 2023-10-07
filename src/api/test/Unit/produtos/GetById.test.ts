import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Produto - GetById', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro de um produto sem autenticação', async () => {
        const output = await testServer
            .get('/api/v1/product/1')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')

    })



    it('Busca produto por id', async () => {

        const output = await testServer
            .get('/api/v1/product/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();


        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('nome');
    });
});