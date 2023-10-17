import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages

import { LoginComponent } from './modules/usuarios/pages/login/login.component'
import { CadastroComponent } from './modules/usuarios/pages/cadastro/cadastro.component';
import { EditUsuarioComponent } from './modules/usuarios/pages/edit-usuario/edit-usuario.component';
import { CriacaoProdutoComponent } from './modules/produtos/pages/criacao-produto/criacao-produto.component';
import { ProdutosComponent } from './modules/produtos/pages/produtos/produtos.component';
import { HomePedidosComponent } from './modules/pedidos/pages/home-pedidos/home-pedidos.component';
import { HistoricoPedidosComponent } from './modules/pedidos/pages/historico-pedidos/historico-pedidos.component';
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
