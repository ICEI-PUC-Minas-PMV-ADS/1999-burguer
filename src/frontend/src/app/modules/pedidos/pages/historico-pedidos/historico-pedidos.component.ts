import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
@Component({
    selector: 'app-historico-pedidos',
    templateUrl: './historico-pedidos.component.html',
    styleUrls: ['./historico-pedidos.component.scss']
})
export class HistoricoPedidosComponent {
    pedidos = [
      {
        cliente: 'João Silva',
        endereco: 'Rua ABC, 123',
        telefone: '(31) 97555-5555',
        ticket: '12345',
        pedido: 'Hambúrguer duplo com queijo, batatas fritas, refrigerante',
        valor: 20.50,
        status: 'Concluído',
        data: '2023-10-16'
      },
      {
        cliente: 'Maria Souza',
        endereco: 'Av. XYZ, 456',
        telefone: '(31) 98555-7777',
        ticket: '12346',
        pedido: 'Hambúrguer simples, milkshake de chocolate',
        valor: 15.00,
        status: 'Concluído',
        data: '2023-10-15'
      },
    ];
  }
/*
export class HistoricoPedidosComponent implements OnInit{

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {

    }
}*/
