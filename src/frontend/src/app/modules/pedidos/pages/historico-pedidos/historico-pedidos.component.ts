import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Pedido } from '../../model/listaDePedidos';
import { PedidosService } from '../../pedidos.service';
import { ListaDePedidos } from '../../model/listaDePedidos';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-historico-pedidos',
    templateUrl: './historico-pedidos.component.html',
    styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent {
    [x: string]: any;

private _unsubscribeAll: Subject<any> = new Subject<any>();

    count: number = 0;
    pedido: Array<Pedido> = [];

    filtros = {
        status: 0
    };

    execReq: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    _pedidosService: any;
    _spinner: any;


    constructor(
        private _router: Router,
    ) {

    }
    ngOnInit() {

    }

    getHistoricoPedidos() {

        if (this.execReq) return;
        this.execReq = true;

        this._spinner.show();

        const params = {
            limit: this.paginator.pageSize,
            page: this.paginator.pageIndex,
            filter: this.trataFiltros()
        };

        this._pedidosService.getHistoricoPedidos(params)
        .pipe(takeUntil(this._unsubscribeAll), finalize(() => { this.execReq = false; this._spinner.hide(); }))
        .subscribe({
            next: res => {

                this.pedido = res.rows;
                if (!this.paginator.pageIndex) this.count = res.count;

            },
            error: err => {

                this['_dialog'].error(err, 'Erro ao buscar pedido');

            }
        });
    }
    trataFiltros(): any {

        let filtros: any = {};

        filtros.status = this.filtros.status ? this.filtros.status == 2 : undefined;

        return filtros;
    };
}

