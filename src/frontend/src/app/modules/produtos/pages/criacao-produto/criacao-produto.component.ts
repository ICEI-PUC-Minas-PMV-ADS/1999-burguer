import { Component } from '@angular/core';

@Component({
  selector: 'app-criacao-produto',
  templateUrl: './criacao-produto.component.html',
  styleUrls: ['./criacao-produto.component.scss']
})
export class CriacaoProdutoComponent {
  produto: {
    nome: string,
    imagem: string,
    descricao: string,
    valor: number
  } = {
    nome: '',
    imagem: '',
    descricao: '',
    valor: 0
  };

  produtos: Array<any> = [];
  modoEdicao = false;
  indiceEdicao: number | null = null;

  criarOuEditarProduto(): void {
    if (this.modoEdicao && this.indiceEdicao !== null) {
      this.produtos[this.indiceEdicao] = { ...this.produto };
      this.modoEdicao = false;
      this.indiceEdicao = null;
    } else {
      this.produtos.push({ ...this.produto });
    }
    this.limparCampos();
  }

  editarProduto(indice: number): void {
    this.modoEdicao = true;
    this.indiceEdicao = indice;
    this.produto = { ...this.produtos[indice] };
  }


  limparCampos(): void {
    this.produto = {
      nome: '',
      imagem: '',
      descricao: '',
      valor: 0
    };
  }

  selecionarImagem(): void {
    const inputImagem = document.getElementById('imagem') as HTMLInputElement;
    inputImagem.click();
  }

  onImagemSelecionada(event: any): void {
    const arquivo = event.target.files[0];
    if (arquivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.produto.imagem = e.target.result as string;
        }
      };
      reader.readAsDataURL(arquivo);
    }
  }
}
