import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class ProdutosService {
    constructor(
        private _api: ApiService
    ) { }

    getListaProdutos(dados: any): Observable<any> {

        return this._api.crudGet('', dados, true);

    }

}