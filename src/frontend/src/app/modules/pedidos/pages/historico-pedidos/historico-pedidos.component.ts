import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
@Component({
    selector: 'app-historico-pedidos',
    templateUrl: './historico-pedidos.component.html',
    styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent implements OnInit{

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {

    }
}
