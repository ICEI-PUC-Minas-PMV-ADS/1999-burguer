export interface Pedido {
    id: number;
    bairro: string;
    cep: string;
    cidade: string;
    data_finalizacao: string;
    data_inclusao: string;
    endereco: string;
    numero: string;
    status: boolean;
    total: string;
    uf: string;
    usuario_id: number;
}

export interface ListaDePedidos{
    propriedade: string;
    valor: Pedido[];
    cliente: string;
    endereco: string;
    telefone: string;
    pedido: string;
    status: string;
    data: string;
    ticket: number;
}
