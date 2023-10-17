import { Injectable } from "@angular/core";
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class UsariosService {
    constructor(
        private _api: ApiService
    ) { }
}
