import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'



describe('Register - Update', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })

        accessToken = signInResponse.body.accessToken
    })
    it('Tenta atualizar um registro de usuário sem autenticação', async () => {
        const output = await testServer
            .put('/api/v1/user/1')
            .send({ endereco: 'rua Isabel' })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')
    })

    it('Atualiza registro', async () => {
        const resAtualizada = await testServer
            .put('/api/v1/user/2')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ nome: 'Isabel' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.ACCEPTED);
    });

})