import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/common/services/api.service';

@Injectable()
export class ProdutosService {

    constructor(
        private _api: ApiService
    ) { }

    getListaProdutos(dados: { page: number; limit: number; filter?: any }): Observable<any> {

        return this._api.crudGet('/products', dados, true);

    }

    getProduto(produtoId: number): Observable<any> {

        return this._api.crudGetById('/product', produtoId, true);

    }

    createProduto(dados: any): Observable<any> {

        return this._api.crudPost('/product/create', dados, true);

    }

    editProduto(produtoId: number, dados: any): Observable<any> {

        return this._api.crudPut('/product', produtoId, dados, true);

    }

    apagarProduto(produtoId: number): Observable<any> {

        return this._api.crudDelete('/product', produtoId, true);

    }

}