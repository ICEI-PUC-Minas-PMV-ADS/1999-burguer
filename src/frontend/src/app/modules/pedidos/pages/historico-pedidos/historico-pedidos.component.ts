import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PedidosService } from '../../pedidos.service';
import { ListaDePedidos } from '../../model/listaDePedidos';
import { devOnlyGuardedExpression } from '@angular/compiler';

@Component({
    selector: 'app-historico-pedidos',
    templateUrl: './historico-pedidos.component.html',
    styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent implements OnDestroy{
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    public historicoPedidos: ListaDePedidos[] = [];

    constructor(
        private pedidosService: PedidosService
    ) {
        this.carregarHistoricoPedidos();
    }

    carregarHistoricoPedidos() {
        const payload = {
            page: 1
        };

        this.pedidosService.buscarHistoricoPedidos(payload)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((historicoPedidos: ListaDePedidos[]) => {

                this.historicoPedidos = this.converterHistoricoPedidoParaArray(historicoPedidos);

                console.log(this.historicoPedidos);

            },

                (err) => {
                   console.log(err.error);
                }
        );
    }
    converterHistoricoPedidoParaArray(pedido: any): any[] {
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

