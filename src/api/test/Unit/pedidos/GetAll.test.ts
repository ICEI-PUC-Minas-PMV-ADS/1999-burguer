import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido - GetAll', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta pegar todos os registro sem autenticação', async () => {
        const output = await testServer
            .get('/api/v1/orders')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')

    })

    it('Get lista de pedidos', async () => {

        const output = await testServer
            .get('/api/v1/orders?page=1&limit=25')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('rows');
        expect(output.body).toHaveProperty('count');
        expect(output.body.rows.length).toBeGreaterThan(0);
        expect(output.body.count).toBeGreaterThan(0);
        expect(output.body.rows.length).toBeLessThanOrEqual(25);
        expect(output.body.count).toBeLessThanOrEqual(25);

    });

    it('Get lista de pedidos pag 2', async () => {

        const output = await testServer
            .get('/api/v1/orders?page=2&limit=25')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('rows');
        expect(output.body).toHaveProperty('count');
        expect(output.body.rows.length).toBe(0);
        expect(output.body.count).toBe(0);
        expect(output.body.rows.length).toBeLessThanOrEqual(25);
        expect(output.body.count).toBeLessThanOrEqual(25);

    });

    it('Get lista de pedidos sem limit', async () => {

        const output = await testServer
            .get('/api/v1/orders?page=1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('rows');
        expect(output.body).toHaveProperty('count');
        expect(output.body.rows.length).toBeGreaterThan(0);
        expect(output.body.count).toBeGreaterThanOrEqual(0);
        expect(output.body.rows.length).toBeLessThanOrEqual(25);
        expect(output.body.count).toBeLessThanOrEqual(25);

    });

    it('Get lista de pedidos sem parâmetros', async () => {

        const output = await testServer
            .get('/api/v1/orders')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    });

});