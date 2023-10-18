import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/common/shared.module';
import { HomePedidosComponent } from './pages/home-pedidos/home-pedidos.component';
import { HistoricoPedidosComponent } from './pages/historico-pedidos/historico-pedidos.component';
import { PedidosService } from './pedidos.service';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePedidosComponent },
    { path: 'historico-pedidos', component: HistoricoPedidosComponent }
];

@NgModule({
    declarations: [
        HomePedidosComponent,
        HistoricoPedidosComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        PedidosService
    ]
})
export class PedidosModule { }
