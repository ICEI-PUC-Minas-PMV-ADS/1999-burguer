import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiUrl: string = 'https://1999-burguer-api.vercel.app/api/v1';

    constructor(
        private http: HttpClient
    ) { }

    private getHeaders(auth: boolean = false, token?: string) : any {

        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');

        if (auth && token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return { headers };

    }

    crudPost(rota: string, body: any, auth: boolean = true): Observable<any> {



        return this.http.post(`${this.apiUrl}${rota}`, body, this.getHeaders(auth));

    }


    crudGet(rota: string, query: any = {}, auth: boolean) {
        const token = localStorage.getItem('access_token') ?? '';
        const header = this.getHeaders(auth, token);
        header.params = new HttpParams().set('filter', JSON.stringify(query));

        console.log(header);
        return this.http.get(`${this.apiUrl}${rota}`, header);
      }

    crudPut() {



    }

    crudDelete() {



    }

}
