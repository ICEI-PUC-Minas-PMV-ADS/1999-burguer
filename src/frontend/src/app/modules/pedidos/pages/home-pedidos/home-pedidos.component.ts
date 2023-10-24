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

                console.log(this.listaPedidos);

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

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
