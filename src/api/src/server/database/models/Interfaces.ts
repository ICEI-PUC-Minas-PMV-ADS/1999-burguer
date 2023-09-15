
export interface ILoja{
    id: number
    nome: string
    horario_abertura: Date
    horario_fechamento: Date
}

export interface IPedido {
    id: number
    data_inclusao: Date
    usuario_id: number
    total: number
    endereco: string
    numero: number
    bairro: string
    cidade: string
    cep: number
    uf: string
}

export interface IPedidoProduto {
    id: number
    pedido_id: number
    produto_id: number
    quantidade: number
    valor_unitario: number
    total: number
}

export interface IProduto {
    id: number
    nome: string
    descricao: string
    valor: number
}

export interface IUsuario {
    id: number
    email: string
    senha: string
    nome: string
    endereco: string
    numero: number
    bairro: string
    cidade: string
    cep: number
    uf: string
    complemento: string
    ponto_referencia: string
    telefone: string
    funcionario: boolean
}

