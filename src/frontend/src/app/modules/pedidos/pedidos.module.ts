import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePedidosComponent } from './pages/home-pedidos/home-pedidos.component';
import { HistoricoPedidosComponent } from './pages/historico-pedidos/historico-pedidos.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { PedidosService } from './pedidos.service';


const routes: Routes = [

    { path: 'pedidos', component: HomePedidosComponent },
    { path: 'historico-pedidos', component: HistoricoPedidosComponent }

];


@NgModule({
    declarations: [
        HomePedidosComponent,
        HistoricoPedidosComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        PedidosService
    ]
})
export class PedidosModule { }
