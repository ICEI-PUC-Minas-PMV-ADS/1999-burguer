import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = 'https://1999-burguer-api.vercel.app/api/v1';
    // private apiUrl: string = 'http://localhost:3000/api/v1';

    constructor(
        private http: HttpClient
    ) { }

    private getHeaders(auth: boolean = false): any {

        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');

        const token = localStorage.getItem('1999Burger.access_token') || '';

        if (auth && token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return { headers };

    }

    crudPost(rota: string, body: any, auth: boolean = true): Observable<any> {

        return this.http.post(`${this.apiUrl}${rota}`, body, this.getHeaders(auth));

    }

    crudGet(rota: string, query: any = {}, auth: boolean): Observable<any> {

        const header = this.getHeaders(auth);

        header.params = new HttpParams().set('filter', JSON.stringify(query));

        return this.http.get(`${this.apiUrl}${rota}`, header);

    }

    crudGetById(rota: string, id: number, auth: boolean): Observable<any> {

        return this.http.get(`${this.apiUrl}${rota}/${id}`, this.getHeaders(auth));

    }

    crudPut(rota: string, id: number, dados: any, auth: boolean): Observable<any> {
        const headers = this.getHeaders(auth);

        return this.http.put(`${this.apiUrl}${rota}/${id}`, dados, headers);

    }

    crudDelete(rota: string, id: number, auth: boolean): Observable<any> {

        return this.http.delete(`${this.apiUrl}${rota}/${id}`, this.getHeaders(auth));

    }

    crudPostParams(rota: string, params: any, auth: boolean = true): Observable<any> {
        return this.http.post(`${this.apiUrl}${rota}/${params}`, null, this.getHeaders());
    }
}
