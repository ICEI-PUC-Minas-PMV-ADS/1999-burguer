import { Component } from '@angular/core';

interface iProduto {
    id: number;
	descricao: string;
	valor: number;
	nome: string;
	status: boolean;
    imagem?: string;
}

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

    produtos: Array<iProduto> = [
        {
            id: 1,
            nome: 'Hambúrguer Clássico',
            descricao: 'Ingredientes: Carne de boi, queijo cheddar, alface, tomate e maionese.',
            valor: 16.9,
            status: true,
            imagem: 'assets/burguer.png'
        },
        {
            id: 2,
            nome: 'Hambúrguer BBQ Delight',
            descricao: 'Ingredientes: Carne de boi, bacon crocante, cebola caramelizada, queijo defumado e molho barbecue.',
            valor: 18.5,
            status: false,
            imagem: 'assets/burguer.png'
        },
        {
            id: 3,
            nome: 'Hambúrguer Vegano Zen',
            descricao: 'Hambúrguer de feijão preto, abacate, alface, tomate, cebola roxa e maionese vegana.',
            valor: 17.8,
            status: true,
            imagem: 'assets/burguer.png'
        },
        {
            id: 4,
            nome: 'Hambúrguer Frutos do Mar',
            descricao: 'Ingredientes: Hambúrguer de camarão, alface, tomate, molho tártaro e abacate.',
            valor: 19.95,
            status: true,
            imagem: 'assets/burguer.png'
        }
    ];

    constructor() {

    }

    editarProduto(prod: iProduto) {

        // CHAMAR TELA PARA EDITAR
        

    }

    apagarProduto(prod: iProduto) {

        // PERGUNTAR SE VAI APAGAR
        const result = window.confirm('Apagar o produto do cadastro?');

        console.log(result)

    }

}
