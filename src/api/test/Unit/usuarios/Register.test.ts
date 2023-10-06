import { testServer } from '../../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Registrar - Usuário', () => {

    let accessToken = ''
    beforeAll(async() => {
        const signInResponse = await testServer.post('/login').send({
            email: 'admin@admin.com',
            senha: 'administrador'
        })
        accessToken = signInResponse.body.accessToken
    })

    it('Tenta adicionar um usuário sem autenticação', async () => {
        const output = await testServer
            .post('/register')
            .send( {
                email: 'jose123@gmail.com',
                senha: 'Senha123',
                nome: 'Jose da Silva',
                endereco: 'Rua Batista',
                numero: '50',
                bairro: 'Concordia',
                cidade: 'Niteroi',
                cep: '325605110',
                uf: 'MG',
                ponto_referencia: 'esquina 15',
                telefone: '31987456985',
                funcionario: false,
            })

        expect(output.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(typeof output.body).toEqual('object')
    })

    it('Deve criar um usuário', async () => {
        const output = await testServer
            .post('/register')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(
                {
                    email: 'jose123@gmail.com',
                    senha: 'Senha123',
                    nome: 'Jose da Silva',
                    endereco: 'Rua Batista',
                    numero: '50',
                    bairro: 'Concordia',
                    cidade: 'Niteroi',
                    cep: '325605110',
                    uf: 'MG',
                    ponto_referencia: 'esquina 15',
                    telefone: '31987456985',
                    funcionario: false,
                }
            );
        expect(output.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof output.body).toEqual('object');
    });

});