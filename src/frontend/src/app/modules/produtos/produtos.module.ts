import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutosService } from './produtos.service';
import { Router, RouterModule, Routes } from '@angular/router';


const routes: Routes = [

    { path: 'cadastroProduto', component: CriacaoProdutoComponent },
    { path: 'listaDeProdutos', component: ProdutosComponent },

];
@NgModule({
    declarations: [
        CriacaoProdutoComponent,
        ProdutosComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ProdutosService
    ]
})
export class ProdutosModule { }
