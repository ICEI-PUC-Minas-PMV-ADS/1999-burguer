import { Component, OnDestroy, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Pedido } from '../../model/listaDePedidos';
import { PedidosService } from '../../pedidos.service';
import { ListaDePedidos } from '../../model/listaDePedidos';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { DialogService } from 'src/app/common/services/dialog.service';



@Component({
    selector: 'app-historico-pedidos',
    templateUrl: './historico-pedidos.component.html',
    styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    public pedidosConcluidos: Pedido[] = [];

    filtros = {
      status: 2 // Define o filtro para "Concluído"
    };

    count: number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private pedidosService: PedidosService, private _dialog: DialogService) {}

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
            // Filtra apenas os pedidos com status "Concluído"
            this.pedidosConcluidos = res.rows.filter(pedido => pedido.status === 2);
            if (!this.paginator.pageIndex) this.count = res.count;
          },
          error: err => {
            this._dialog.error(err, 'Erro ao buscar pedidos');
          }
        });
    }

    getStatusText(status: number | boolean): string {
      switch (status) {
        case 0:
          return 'Pendente';
        case 1:
          return 'Em Andamento';
        case 2:
          return 'Concluído';
        case 3:
          return 'Cancelado';
        default:
          return 'Status Desconhecido';
      }
    }

    trataFiltros(): any {
      let filtros: any = {};
      filtros.status = this.filtros.status;
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
