import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido - GetAll', () => {

    it('Get lista de pedidos', async () => {

        const output = await testServer
            .get('/orders?page=1&limit=25')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('rows');
        expect(output.body).toHaveProperty('count');
        expect(output.body.rows.length).toBeGreaterThan(0);
        expect(output.body.count).toBeGreaterThan(0);
        expect(output.body.rows.length).toBeLessThanOrEqual(25);
        expect(output.body.count).toBeLessThanOrEqual(25);

    });

    it('Get lista de pedidos sem limit', async () => {

        const output = await testServer
            .get('/orders?page=1')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('rows');
        expect(output.body).toHaveProperty('count');
        expect(output.body.rows.length).toBeGreaterThan(0);
        expect(output.body.count).toBeGreaterThan(0);
        expect(output.body.rows.length).toBeLessThanOrEqual(25);
        expect(output.body.count).toBeLessThanOrEqual(25);

    });

    it('Get lista de pedidos sem parâmetros', async () => {

        const output = await testServer
            .get('/orders')
            .send()

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    });

});