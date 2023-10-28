// home-pedidos.component.ts
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PedidosService } from '../../pedidos.service';
import { ListaDePedidos, Pedido } from '../../model/listaDePedidos';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/common/services/dialog.service';

@Component({
    selector: 'app-home-pedidos',
    templateUrl: './home-pedidos.component.html',
    styleUrls: ['./home-pedidos.component.scss']
})
export class HomePedidosComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    public listaPedidos: Pedido[] = [];
    public status: string = 'pendente';


    filtros = {
        status: 0
    };

    count: number = 0;


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private pedidosService: PedidosService,
        private _dialog: DialogService
    ) {}

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.paginator.page.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => this.carregarPedidos());

        this.carregarPedidos();

    }


    carregarPedidos() {



        const payload = {
            limit: this.paginator.pageSize,
            page: this.paginator.pageIndex,
            filter: this.trataFiltros()
        };

        this.pedidosService.exibirPedidos(payload)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: res => {
                    this.listaPedidos = res.rows;
                    if (!this.paginator.pageIndex) this.count = res.count;

                },
                error: err => {
                    this._dialog.error(err, 'Erro ao buscar pedidos');
                }
            })


    }

    getStatusText(status: number | boolean): string {
        switch (status) {
            case 0:
                return 'Pendente';
            case 1:
                return 'Em Andamento';
            case 2:
                return 'Concluido';
            case 3:
                return 'Cancelado';
            default:
                return 'Status Desconhecido';
        }
    }


    //alterar botão

    confirmarPedido(pedido: any | number) {

        if (pedido.status === 0) {
            this.pedidosService.atualizarStatusPedido(pedido.id, 1)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe({
                    next: res => {
                        this.carregarPedidos()
                    },
                    error: err => {
                        this._dialog.error(err, 'Erro ao atualizar status');
                    }
                })
        }


    }

    concluirPedido(pedido: any | number){
        if (pedido.status === 0 || pedido.status === 1) {
            this.pedidosService.atualizarStatusPedido(pedido.id, 2)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe({
                    next: res => {
                        this.carregarPedidos()
                    },
                    error: err => {
                        this._dialog.error(err, 'Erro ao atualizar status');
                    }
                })
        }

    }
    cancelarPedido(pedido: any | number){
        if (pedido.status !==3) {
            this.pedidosService.atualizarStatusPedido(pedido.id, 3)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe({
                    next: res => {

                    },
                    error: err => {
                        this._dialog.error(err, 'Erro ao atualizar status');
                    }
                })
        }

    }


    trataFiltros(): any {

        let filtros: any = {};

        if (this.filtros.status === 0 || this.filtros.status === 1 || this.filtros.status === 2 || this.filtros.status === 3) {
            filtros.status = this.filtros.status;
          }


        return filtros;

    }

    pesquisar() {
        this.paginator.firstPage();
        this.carregarPedidos();

    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
