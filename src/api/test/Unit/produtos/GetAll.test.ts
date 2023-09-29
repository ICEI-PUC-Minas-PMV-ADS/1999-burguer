import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Produtos - GetAll', () => {

    it('Buscar todos os produtos', async () => {

        const resBuscada = await testServer
            .get('/products')
            .send();

        console.log(resBuscada.text)
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

    });

});