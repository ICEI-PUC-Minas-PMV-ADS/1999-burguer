import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Pedido - Create', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/api/v1/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta criar um registro de pedidos sem autenticação', async () => {
        const output = await testServer
            .post('/api/v1/order/create')
            .send( {
                data_inclusao: '2023-09-28 22:18:52 -03:00',
                usuario_id: 1,
                total: 345.12,
                endereco: 'Av Dom José Gaspar',
                numero: '500',
                bairro: 'Coração Eucarístico',
                cidade: 'Belo Horizonte',
                cep: '30535-901',
                uf: 'MG',
                status: true,
            })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')
    })

    it('Criar pedido válido (1)', async () => {

        const data = {
            usuario_id: 1,
            total: 345.12,
            endereco: 'Av Dom José Gaspar',
            numero: '500',
            bairro: 'Coração Eucarístico',
            cidade: 'Belo Horizonte',
            cep: '30535-901',
            uf: 'MG',
            status: true,
        };

        const output = await testServer
            .post('/api/v1/order/create')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(data)

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('id');
        expect(output.body.usuario_id).toEqual(data.usuario_id);
        expect(Number(output.body.total)).toEqual(data.total);

    });

    it('Criar pedido válido (2)', async () => {

        const data = {
            usuario_id: 1,
            total: 0.01,
            endereco: 'Av Dom José Gaspar',
            numero: '500',
            bairro: 'Coração Eucarístico',
            cidade: 'Belo Horizonte',
            cep: '30535-901',
            uf: 'MG',
            status: true,
            data_finalizacao: '2023-09-28 22:22:52'
        };

        const output = await testServer
            .post('/api/v1/order/create')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(data)

        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('id');
        expect(output.body.usuario_id).toEqual(data.usuario_id);
        expect(Number(output.body.total)).toEqual(data.total);

    });

    it('Criar pedido sem dados', async () => {

        const output = await testServer
            .post('/api/v1/order/create')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST);

    });

});