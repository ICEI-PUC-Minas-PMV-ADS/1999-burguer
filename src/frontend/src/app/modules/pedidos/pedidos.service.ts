import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class PedidosService {



    constructor(
        private _api: ApiService
    ) { }

    exibirPedidos(dados: { page: number; limit: number; filter?: any }): Observable<any>{

        return this._api.crudGet('/orders', dados, true)
    }

    buscarHistoricoPedidos(payload: {}): Observable<any> {

        return this._api.crudGet(`/orders`,payload, true )
      }

    atualizarStatusPedido(id: number, status: number): Observable<any> {

        return this._api.crudPut('/order', id, {status}, true)

    }

}
