import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Create - Produto', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })

        accessToken = signInResponse.body.accessToken
    })

    it('Tenta criar um produto sem autenticação', async () => {
        const output = await testServer
            .post('/product/create')
            .send({
                nome: 'X-burguer',
                descricao: 'Ovo, Pão, Presunto, Hambúrguer, Alface, Batata Palha, Molho Especial',
                valor: 28.50,
                status: true
            })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(output.body).toHaveProperty('errors.default')
    })



    it('Deve criar um produto', async () => {
        const output = await testServer
            .post('/product/create')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(
                {
                    nome: 'X-burguer',
                    descricao: 'Ovo, Pão, Presunto, Hambúrguer, Alface, Batata Palha, Molho Especial',
                    valor: 28.50,
                    status: true
                }
            );

        expect(output.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof output.body).toEqual('object');
    });

});