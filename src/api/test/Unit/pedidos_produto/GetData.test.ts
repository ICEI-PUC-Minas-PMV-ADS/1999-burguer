import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido Produto - GetData', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta resgatar informações de um pedido sem autenticação', async() => {
        const output = await testServer
            .get('/api/v1/order-products/1')
            .send()
        expect(output.statusCode).toBe(StatusCodes.UNAUTHORIZED)
    })

    it('Tenta resgatar informações de um pedido', async() => {
        const output = await testServer
            .get('/api/v1/order-products/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toBe(StatusCodes.OK)
        output.body.forEach(order => {
            expect(order).toHaveProperty('id')
            expect(order).toHaveProperty('pedido_id')
            expect(order).toHaveProperty('produto_id')
            expect(order).toHaveProperty('quantidade')
            expect(order).toHaveProperty('valor_unitario')
            expect(order).toHaveProperty('total')
        });
    })

    it('Tenta resgatar informações de um pedido não existente', async() => {
        const output = await testServer
            .get('/api/v1/order-products/2')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(output.body).toHaveProperty('errors.default')
    })

})