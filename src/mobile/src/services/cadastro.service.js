import { apiCadastro } from "./api.service"

export const cadastroUsuario = async (nome,
    email,
    senha,
    endereco,
    numero,
    bairro,
    cidade,
    cep,
    uf,
    complemento,
    ponto_referencia,
    telefone) => {
    return apiCadastro("/register", {
        email,
        senha,
        nome,
        endereco,
        numero,
        bairro,
        cidade,
        cep,
        uf,
        complemento,
        ponto_referencia,
        telefone,
        funcionario: false
    })
}