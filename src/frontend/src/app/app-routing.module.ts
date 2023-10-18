import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './common/layouts/auth/auth-layout.component';
import { AuthGuard } from './common/guards/auth.guard';
import { NoAuthLayoutComponent } from './common/layouts/no-auth/no-auth-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/pedidos/pedidos.module').then((m) => m.PedidosModule)
            },
            {
                path: 'usuarios',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/usuarios/usuarios.module').then((m) => m.UsuariosModule)
            },
            {
                path: 'produtos',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/produtos/produtos.module').then((m) => m.ProdutosModule)
            },
            {
                path: 'pedidos',
                canActivate: [AuthGuard],
                loadChildren: () => import('./modules/pedidos/pedidos.module').then((m) => m.PedidosModule)
            }
        ]
    },
    {
        path: '',
        component: NoAuthLayoutComponent,
        children: [
            {
                path: 'sessao',
                loadChildren: () => import('./modules/sessao/sessao.module').then((m) => m.SessaoModule)
            }
        ]
    },
    {
        path: '**', redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
