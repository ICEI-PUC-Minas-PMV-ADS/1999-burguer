import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class PedidosService {
    constructor(
        private _api: ApiService
    ) { }


}
