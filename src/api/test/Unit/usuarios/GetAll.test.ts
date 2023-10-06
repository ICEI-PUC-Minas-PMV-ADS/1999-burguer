import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('register - GetAll', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro de usuarios sem autenticação', async () => {
        const output = await testServer
            .get('/register')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')

    })

    it('Buscar todos os usuários', async () => {

        const resBuscada = await testServer
            .get('/register')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

    });

});