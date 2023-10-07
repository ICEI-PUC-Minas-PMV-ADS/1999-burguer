import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Usuario - GetData', () => {

    it('Tenta logar com um email e senha válidos', async() => {
        const output = await testServer
            .post('/api/v1/login')
            .send({
                email: 'admin@admin.com',
                senha: 'administrador'
            })
        expect(output.statusCode).toBe(StatusCodes.OK)
        expect(output.body).toHaveProperty('accessToken')
    })
})