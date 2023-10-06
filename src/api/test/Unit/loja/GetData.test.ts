
import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Loja - GetData', () => {

    let accessToken = ''
    beforeAll(async()=>{
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha:'administrator'

        })

        accessToken = signInResponse.body.accessToken
    });

    it('Tenta resgatar informações sem autenticação',async ( ) => {
        const output = await testServer
            .get('/store-data/1')


        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(typeof output.body).toEqual('object');
    })

    it('Tenta resgatar informações da loja matriz', async() => {
        const output = await testServer
            .get('/store-data/1')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toEqual(StatusCodes.OK)
        expect(output.body).toHaveProperty('id');
        expect(output.body).toHaveProperty('nome');
        expect(output.body).toHaveProperty('horario_abertura');
        expect(output.body).toHaveProperty('horario_fechamento');
    })

    it('Tenta resgatar informações da loja não existente', async() => {
        const output = await testServer
            .get('/store-data/3')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(output.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(output.body).toHaveProperty('errors.default');
    })

    it('Tenta resgatar informações da loja passando um texto', async () => {
        const output = await testServer
            .get('/store-data/loja-matriz')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
        expect(output.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(output.body).toHaveProperty('errors.params.id')

    })
})