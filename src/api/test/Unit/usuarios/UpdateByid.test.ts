import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'



describe('Update usuario', ()=>{


})


describe('Register - Update', () => {

    it('Atualiza registro', async () => {


        const resAtualizada = await testServer
            .put('/register/1')
            .send({endereco: 'rua Isabel' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.ACCEPTED);
    });

})