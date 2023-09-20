import { Decimal } from "@prisma/client/runtime/library"

export interface ILoja{
    id: number
    nome: string
    horario_abertura: string | null
    horario_fechamento: string | null
}

export interface IPedido {
    id: number
    data_inclusao: string
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
    valor_unitario: Decimal
    total: Decimal
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


export interface IUpdateLoja{
    id: number
    nome?: string
    horario_abertura?: string
    horario_fechamento?: string
}

export interface IUpdatePedidoProduto {
    id: number
    pedido_id: number
    produto_id?: number
    quantidade: number
    valor_unitario: number
    total: number
}

export interface IUpdateProduto {
    id: number
    nome?: string
    descricao?: string
    valor?: number
}

export interface IUpdateUsuario {
    id: number
    email?: string
    senha?: string
    nome?: string
    endereco?: string
    numero?: number
    bairro?: string
    cidade?: string
    cep?: number
    uf?: string
    complemento?: string
    ponto_referencia?: string
    telefone?: string
    funcionario?: boolean
}

