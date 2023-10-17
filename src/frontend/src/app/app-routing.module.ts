import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages

import { LayoutComponent } from './common/layout/layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [

            {
                path: 'usuarios', loadChildren: () => import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule)
            },
            {
                path: 'produtos', loadChildren: () => import('./modules/produtos/produtos.module').then((m) => m.ProdutosModule)
            },
            {
                path: 'pedidos', loadChildren: () => import('./modules/pedidos/pedidos.module').then((m) => m.PedidosModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
