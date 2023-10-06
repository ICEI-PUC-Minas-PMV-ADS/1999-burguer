/*import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsuariosProvider } from '../../database/providers/usuarios'
import * as PasswordCrypto from './PasswordCrypto';
import { JWTService } from '../services';

interface IBodyProps {
    email: string;
    senha: string;
  }

describe('Login', () => {
    it('Deve retornar um token JWT ao fazer login com sucesso', async () => {

        const mockRequest = {
            body: {
                email: 'test@example.com',
                senha: 'password',
            },
        } as Request<{}, {}, IBodyProps>;

        // Mock da resposta
        const mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        } as unknown as Response;

        // Mock da função que busca o usuário por email
        jest.spyOn(UsuariosProvider, 'getByEmail').mockResolvedValue({
            id: 1,
            senha: 'hashed_password',
        });

        // Mock da função que verifica a senha
        jest.spyOn(PasswordCrypto, 'verifyPassword').mockResolvedValue(true);

        // Mock da função que gera o token JWT
        jest.spyOn(JWTService, 'signIn').mockReturnValue('mocked_jwt');

        // Verifica se a função `status` foi chamada com o código HTTP correto
        expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);

        // Verifica se a função `json` foi chamada com o token JWT
        expect(mockResponse.json).toHaveBeenCalledWith({
            accessToken: 'mocked_jwt',
        });
    });
});*/