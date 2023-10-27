import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

import { ApiService } from 'src/app/common/services/api.service';

@Injectable()
export class UsuarioService {

    constructor(
        private _api: ApiService,
        private router: Router
    ) { }

    exibirUsuario(): Observable<any>{
        const idUser = localStorage.getItem('1999Burger.user_id')
        console.log()
        return this._api.crudGet(`/user/${idUser}`, {}, true)
    }

    editarUsuario(dadosAtualizados: any): Observable<any> {
        const idUser = localStorage.getItem('1999Burger.user_id');


        const dadosParaEnvio = {
            email: dadosAtualizados.email,
            nome: dadosAtualizados.nome
        };

        return this._api.crudPut(`/user/`, +idUser, dadosParaEnvio, true);
    }
}
