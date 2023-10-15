import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriacaoProdutoComponent } from './pages/criacao-produto/criacao-produto.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';



@NgModule({
  declarations: [
    CriacaoProdutoComponent,
    ProdutosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProdutosModule { }
