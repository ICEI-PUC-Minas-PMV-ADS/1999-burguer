import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = 'https://project-api-rho.vercel.app/api/v1';

    constructor(
        private http: HttpClient
    ) { }

    private getHeaders(auth: boolean = false) {

        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');

        if (auth) {

            let token = localStorage.getItem('access_token');

            if (token) {
                headers = headers.set('Authorization', token);
            }

        }

        return { headers };

    }

    crudPost(rota: string, body: any, auth: boolean = true): Observable<any> {

        return this.http.post(`${this.apiUrl}${rota}`, body, this.getHeaders(auth));

    }

    crudGet() {



    }

    crudPut() {



    }

    crudDelete() {



    }

}
