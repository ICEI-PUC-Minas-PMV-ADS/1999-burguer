import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'



describe('Update produto', ()=>{


})


describe('Loja - Update', () => {
    // it('Deve atualizar o nome de um registro de loja', async () => {
    //     const output = await testServer
    //         .put('/store-data/1')
    //         .send({ nome: '1999 Burguer - Marajó' })

    //     expect(output.statusCode).toEqual(StatusCodes.ACCEPTED)
    //     expect(typeof output.body).toEqual('object')
    // })


    it('Atualiza registro', async () => {


        const resAtualizada = await testServer
            .put('/product/1')
            .send({descricao: 'X-qualquercoisa' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.ACCEPTED);
    });

})