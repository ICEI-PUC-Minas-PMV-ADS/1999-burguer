import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido - GetByID', () => {

    let listagem;
    let pedido;

    beforeAll(async () => {

        listagem = await testServer
            .get('/orders?page=1&limit=1')
            .send();

        if (listagem?.body.rows?.length) {
            pedido = listagem.body.rows[0];
        }

    });

    it('Validar lista de pedidos', async () => {

        expect(listagem.statusCode).toEqual(StatusCodes.OK);
        expect(listagem.body).toHaveProperty('rows');
        expect(listagem.body).toHaveProperty('count');
        expect(listagem.body.rows.length).toEqual(1);
        expect(listagem.body.count).toEqual(1);
        expect(pedido);
        expect(pedido).toHaveProperty('id');

    });

    it('Get pedido específico', async () => {

        const output = await testServer
            .get(`/order/${pedido.id}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('id');
        expect(output.body.id).toEqual(pedido.id);
        expect(output.body.total).toEqual(pedido.total);
        expect(output.body.usuario_id).toEqual(pedido.usuario_id);

    });

});