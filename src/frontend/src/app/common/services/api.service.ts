import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public url:  string = "https://project-api-rho.vercel.app/api/v1"



    constructor(private http: HttpClient) { }

}



