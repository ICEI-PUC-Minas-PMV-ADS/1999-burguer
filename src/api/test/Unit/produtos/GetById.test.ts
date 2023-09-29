import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Produto - GetById', () => {
    it('Busca produto por id', async () => {

        /*  const input = await testServer
            .post('/product/create')
            .send(
                {
                    nome: 'X-burguer',
                    descricao: 'Ovo, Pão, Presunto, Hambúrguer, Alface, Batata Palha, Molho Especial',
                    valor: 28.50,
                    status: true
                }
            ); */

        const output = await testServer
            .get('/product/1')
            .send();


        expect(output.statusCode).toEqual(StatusCodes.OK);
        expect(output.body).toHaveProperty('nome');
    });
});