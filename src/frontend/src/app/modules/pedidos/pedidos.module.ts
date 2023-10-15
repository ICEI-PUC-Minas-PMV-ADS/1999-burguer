import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePedidosComponent } from './pages/home-pedidos/home-pedidos.component';
import { HistoricoPedidosComponent } from './pages/historico-pedidos/historico-pedidos.component';



@NgModule({
  declarations: [
    HomePedidosComponent,
    HistoricoPedidosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PedidosModule { }
