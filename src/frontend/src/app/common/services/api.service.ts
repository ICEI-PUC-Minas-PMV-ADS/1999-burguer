import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getDadosdaApiComAutenticacao(token: string) {
        // Define os cabeçalhos de autorização com o token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` // Substitua 'Bearer' pelo tipo de autenticação correto
        });

        // Faz a solicitação com os cabeçalhos de autorização
        return this.http.get('https://project-api-rho.vercel.app/api/v1/orders', { headers });
    }
}



