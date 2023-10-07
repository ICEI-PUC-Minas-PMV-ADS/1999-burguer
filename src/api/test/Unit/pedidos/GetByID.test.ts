import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido - GetByID', () => {


    let accessToken = ''
    let listagem;
    let pedido;
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
        listagem = await testServer
            .get('/orders?page=1&limit=1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();

        if (listagem?.body.rows?.length) {
            pedido = listagem.body.rows[0];
        }
    })

    it('Tenta pegar um registro com ID sem autenticação', async () => {
        const output = await testServer
            .get('/order/1')

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')

    })

    it('Validar lista de pedidos', async () => {

        expect(listagem.statusCode).toEqual(StatusCodes.OK);
        expect(listagem.body).toHaveProperty('rows');
        expect(listagem.body).toHaveProperty('count');
        expect(listagem.body.rows.length).toEqual(1);
        expect(listagem.body.count).toBeGreaterThanOrEqual(1);
        expect(pedido);
        expect(pedido).toHaveProperty('id');

    });

    it('Get pedido específico', async () => {

        const output = await testServer
            .get(`/order/${pedido.id}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('id');
        expect(output.body.id).toEqual(pedido.id);
        expect(output.body.total).toEqual(pedido.total);
        expect(output.body.usuario_id).toEqual(pedido.usuario_id);

    });

});