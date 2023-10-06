import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'



describe('Update produto', ()=>{

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta atualizar um registro de produto sem autenticação', async () => {
        const output = await testServer
            .put('/product/1')
            .send({descricao: 'X-qualquercoisa' });

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')
    })

    
    it('Atualiza registro', async () => {
        const resAtualizada = await testServer
            .put('/product/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({descricao: 'X-qualquercoisa' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.ACCEPTED);
    });

})


