import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('register - GetAll', () => {

    it('Buscar todos os usuários', async () => {

        const resBuscada = await testServer
            .get('/register')
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);

    });

});