import { Decimal } from '@prisma/client/runtime/library'

export interface ILoja{
    id: number
    nome: string
    horario_abertura: string | null
    horario_fechamento: string | null
}

export interface IPedido {
    id: number
    data_inclusao: Date | string
    usuario_id: number
    total: Decimal | number
    endereco: string
    numero: string
    bairro: string
    cidade: string
    cep: string
    uf: string
    status: boolean
    data_finalizacao: Date | string
}

export enum ePedidoStatus {
    AGUARDANDO = 0,
    PREPARANDO = 1,
    PRONTO_RETIRADA = 2,
    EM_ROTA = 3,
    FINALIZADO = 4,
    CANCELADO = 99
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
    valor: Decimal | number
    status: boolean
}

export interface IUsuario {
    id: number
    email: string
    senha: string
    nome: string
    endereco: string
    numero: string
    bairro: string
    cidade: string
    cep: string
    uf: string
    complemento?: string | null
    ponto_referencia?: string | null
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
    nome?: string | undefined
    descricao?: string
    valor?: number
    status?: boolean
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

export interface IProduct{
    id: number
    descricao: string
    valor: number
    status: boolean
    nome: string
}

export interface ILogin{
    email: string
    senha: string
}