import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class PedidosService {
    constructor(
        private _api: ApiService
    ) { }

    exibirPedidos(payload: {}): Observable<any>{
        console.log(payload)
        console.log()
        return this._api.crudGet('/orders', payload, true)
    }


}
