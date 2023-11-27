import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IPedido, IPedidoProduto, IUsuario } from '../../database/models';
import { PedidosProvider } from '../../database/providers/pedidos';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { PedidosProdutoProvider } from '../../database/providers/pedidos_produto';

export const createPedido = async (
    req: Request,
    res: Response
) => {

    const body = req.body;

    if (!body || !body.produtos?.length) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                errors: {
                    default: 'Parâmetros não informados.'
                }
            });

    }

    const usuario: IUsuario | Error = await UsuariosProvider.getData(+req.headers.idUsuario);

    if (usuario instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: usuario.message
                }
            });
    }

    const pedidoCreate: IPedido | any = {
        usuario_id: usuario.id,
        total: body.total,
        endereco: usuario.endereco,
        numero: usuario.numero,
        bairro: usuario.bairro,
        cidade: usuario.cidade,
        cep: usuario.cep,
        uf: usuario.uf
    }
    
    const produtosCreate: IPedidoProduto[] | any = [];

    for(let prod of body.produtos) {

        produtosCreate.push({
            produto_id: prod.id,
            quantidade: prod.quantidade,
            valor_unitario: +prod.valor,
            total: prod.total
        });

    }

    const pedido: IPedido | Error = await PedidosProvider.create(pedidoCreate, produtosCreate);

    if (pedido instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: pedido.message
                }
            });
    }

    return res
        .status(StatusCodes.OK)
        .json(pedido);

}