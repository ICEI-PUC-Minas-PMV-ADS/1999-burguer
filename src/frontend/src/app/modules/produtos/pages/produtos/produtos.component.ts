import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import { iProduto } from '../../model/produto';
import { ProdutosService } from '../../produtos.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    count: number = 0;
    produtos: Array<iProduto> = [];

    filtros = {
        status: 0
    };

    execReq: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _router: Router,
        private _dialog: DialogService,
        private _produtosService: ProdutosService,
        private _spinner: NgxSpinnerService
    ) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.paginator.page.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => this.getProdutos());

        this.getProdutos();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getProdutos() {

        if (this.execReq) return;
        this.execReq = true;

        this._spinner.show();

        const params = {
            limit: this.paginator.pageSize,
            page: this.paginator.pageIndex,
            filter: this.trataFiltros()
        };

        this._produtosService.getListaProdutos(params)
            .pipe(takeUntil(this._unsubscribeAll), finalize(() => { this.execReq = false; this._spinner.hide(); }))
            .subscribe({
                next: res => {

                    this.produtos = res.rows;
                    if (!this.paginator.pageIndex) this.count = res.count;

                },
                error: err => {

                    this._dialog.error(err, 'Erro ao buscar produtos');

                }
            });

    }

    pesquisar() {

        this.paginator.firstPage();
        this.getProdutos();

    }

    trataFiltros(): any {

        let filtros: any = {};

        filtros.status = this.filtros.status ? this.filtros.status == 1 : undefined;

        return filtros;

    }

    adicionarProduto() {

        this._router.navigate(['/produtos/cadastroProduto']);

    }

    editarProduto(id: number) {

        this._router.navigate(['/produtos/cadastroProduto', { id }]);

    }

    apagarProduto(prod: iProduto) {

        const result = confirm(`Remover o produto "${prod.nome}" do cadastro?`);
        if (!result) return;

        this._produtosService.apagarProduto(prod.id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: res => {

                    this.getProdutos();

                },
                error: err => {

                    this._dialog.error(err, 'Erro ao apagar produto');

                }
            });

    }

}
