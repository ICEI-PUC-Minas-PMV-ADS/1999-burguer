import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('DeleteByID', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta deletar um produto sem autenticação', async () => {
        const response = await testServer
            .delete('/api/v1/product/1')
            .send()

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(response.body).toHaveProperty('errors.default');
    })

    it('Deve apagar um produto por id', async () => {
        const output = await testServer
            .delete('/api/v1/product/3')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        expect(output.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});