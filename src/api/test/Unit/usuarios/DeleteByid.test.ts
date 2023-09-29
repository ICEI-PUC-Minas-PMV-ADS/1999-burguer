import { testServer } from '../../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('DeleteByID', () => {
    
    it('Deve apagar um usuario por id', async () => {


        const output = await testServer
            .delete('/register/2')
            .send();

        expect(output.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
});