import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Produtos - GetAll', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro de produtos sem autenticação', async () => {
        const output = await testServer
            .get('/api/v1/products')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')

    })


    it('Buscar todos os produtos', async () => {

        const resBuscada = await testServer
            .get('/api/v1/products')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

    });

});