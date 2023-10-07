import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Usuario - GetData', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta resgatar informações do usuário', async() => {
        const output = await testServer
            .get('/user/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toHaveProperty('id');
        expect(output.body).toHaveProperty('email');
        expect(output.body).toHaveProperty('senha');
        expect(output.body).toHaveProperty('nome');
        expect(output.body).toHaveProperty('endereco');
        expect(output.body).toHaveProperty('numero');
        expect(output.body).toHaveProperty('bairro');
        expect(output.body).toHaveProperty('cidade');
        expect(output.body).toHaveProperty('cep');
        expect(output.body).toHaveProperty('uf');
        expect(output.body).toHaveProperty('ponto_referencia');
        expect(output.body).toHaveProperty('telefone');

    })

    it('Tenta resgatar informações do usuario não existente', async() => {
        const output = await testServer
            .get('/user/6')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(output.body).toHaveProperty('errors.default');
    })
})