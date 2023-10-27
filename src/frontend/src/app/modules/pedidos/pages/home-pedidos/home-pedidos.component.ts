// home-pedidos.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PedidosService } from '../../pedidos.service';
import { ListaDePedidos } from '../../model/listaDePedidos';
import { devOnlyGuardedExpression } from '@angular/compiler';

@Component({
    selector: 'app-home-pedidos',
    templateUrl: './home-pedidos.component.html',
    styleUrls: ['./home-pedidos.component.scss']
})
export class HomePedidosComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    public listaPedidos: ListaDePedidos[] = [];
    public status: string = 'pendente';



    constructor(
        private pedidosService: PedidosService
    ) {
        this.carregarPedidos();


    }

    carregarPedidos() {

        const payload = {
            page: 1
        };

        this.pedidosService.exibirPedidos(payload)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pedidos: ListaDePedidos[]) => {

                this.listaPedidos = this.converterPedidoParaArray(pedidos);

            },
                (err) => {
                    console.log(err.error)
                }
            );
    }

    aceitarPedido() {
        console.log('Botão "Aceitar" clicado para o pedido ID:');
        //FALTA FAZER UM PUT PARA ALTERAR O STATUS DO PEDIDO
    }

    // O pedido vem como um objeto, assim, ele fica dando erro de objectobject quando vai inserir no html

    converterPedidoParaArray(pedido: any): any[] {
        const arrayDePedidos = [];
        for (const propriedade in pedido) {
            if (pedido.hasOwnProperty(propriedade) && propriedade === 'rows') {
                arrayDePedidos.push({ propriedade, valor: pedido[propriedade] });
            }
        }
        return arrayDePedidos;
    }

    getStatusText(status: number | boolean): string {
        switch (status) {
            case 0:
                return 'Pendente';
            case 1:
                return 'Em Andamento';
            case 2:
                return 'Cancelado';
            default:
                return 'Status Desconhecido';
        }
    }


//alterar botão

    alterarStatusPedido(pedido: any | number) {
        if (pedido.status === 0) {
            pedido.status = 1; // Altera o status para "Em Andamento"
        }
        this.pedidosService.atualizarStatusPedido(pedido.id, pedido.status)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.carregarPedidos();
            });
    }

    getStatusButtonText(status: any| number): string {
        switch (status) {
            case 0:
                return 'Aceitar Pedido';
            case 1:
                return 'Concluir Pedido';
            default:
                return 'Status Desconhecido';
        }
    }


    cancelarPedido(pedido: any) {
        if (pedido.status !== 2) {
            pedido.status = 2;

            this.pedidosService.atualizarStatusPedido(pedido.id, pedido.status)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {

                    this.carregarPedidos();
                });
        }
    }




    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
