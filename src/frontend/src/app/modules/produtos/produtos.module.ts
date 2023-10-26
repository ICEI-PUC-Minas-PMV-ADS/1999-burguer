import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutosService } from './produtos.service';
import { SharedModule } from 'src/app/common/shared.module';


const routes: Routes = [
    { path: '', redirectTo: 'listaDeProdutos', pathMatch: 'full' },
    { path: 'cadastroProduto', component: CriacaoProdutoComponent },
    { path: 'cadastroProduto/:id', component: CriacaoProdutoComponent },
    { path: 'listaDeProdutos', component: ProdutosComponent },
];

@NgModule({
    declarations: [
        CriacaoProdutoComponent,
        ProdutosComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ProdutosService
    ]
})
export class ProdutosModule { }
