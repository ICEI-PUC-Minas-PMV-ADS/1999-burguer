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
}
