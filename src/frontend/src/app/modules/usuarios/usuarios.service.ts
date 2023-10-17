import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, map, throwError } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";

@Injectable()
export class UsariosService {

    constructor(
        private http: HttpClient,
        private _api: ApiService,
        private router: Router
        ) { }




    public sign(payload: {email: string, password:string}):Observable<any>{

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

        return this.http.post<{token: string}>(`${this._api.url}/login`, payload, {headers}).pipe(
            map((res)=>{
                localStorage.removeItem('access_token')
                localStorage.setItem('access_token', JSON.stringify(res.token))
                return this.router.navigate(['pedidos/home'])
                return console.log(res)
            }),
            catchError((err)=>{
                console.log(err)
                if(err.error.message) return throwError(()=> err.error.mesage)
                return throwError(()=> "No momento não estamos conseguindo validar este dado")
            })
        )
    }
}
