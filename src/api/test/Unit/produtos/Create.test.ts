import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Create - Produto', () => {
    it('Deve criar um produto', async () => {
        const output = await testServer
            .post('/product/create')
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