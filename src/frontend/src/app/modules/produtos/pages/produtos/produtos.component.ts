import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { iProduto } from '../../model/produto';
import { ProdutosService } from '../../produtos.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    count: number = 0;
    produtos: Array<iProduto> = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _router: Router,
        private _produtosService: ProdutosService
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

        this._produtosService.getListaProdutos({ limit: this.paginator.pageSize, page: this.paginator.pageIndex })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: res => {

                    this.produtos = res.rows;
                    if (!this.paginator.pageIndex) this.count = res.count;

                },
                error: err => {

                    alert(err);

                }
            })

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

                    alert(err);

                }
            });

    }

}
