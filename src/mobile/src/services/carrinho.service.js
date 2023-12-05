import { round } from 'lodash-es';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setCarrinhoStorage = async (carrinho) => {

    if (!carrinho) return;

    await AsyncStorage.setItem(
        'carrinho',
        JSON.stringify(carrinho)
    );

};

export const getCarrinhoStorage = async () => {

    let carrinho = await AsyncStorage.getItem('carrinho');

    if (!carrinho) {

        carrinho = {
            total: 0,
            quantidade: 0,
            produtos: []
        };

    } else {

        carrinho = JSON.parse(carrinho);

    }

    return carrinho;

};

export const setProdutoCarrinho = async (produto) => {

    let carrinho = await getCarrinhoStorage();

    let index = carrinho.produtos.findIndex(x => x.id == produto.id);

    if (index == -1) {

        produto.total = round((+produto.valor) * produto.quantidade, 2);

        carrinho.produtos.push(produto);

    } else {

        let novaQuantidade = round(carrinho.produtos[index].quantidade + produto.quantidade);

        carrinho.produtos[index] = {
            ...produto,
            ...{
                quantidade: novaQuantidade,
                total: round((+produto.valor) * novaQuantidade, 2)
            }
        };

    }

    carrinho = await updateTotalCarrinho(carrinho);

    return carrinho;

}

export const updateProdutoCarrinho = async (produto) => {

    let carrinho = await getCarrinhoStorage();

    let index = carrinho.produtos.findIndex(x => x.id == produto.id);

    if (index > -1) {

        carrinho.produtos[index] = {
            ...produto,
            ...{
                quantidade: produto.quantidade,
                total: round((+produto.valor) * produto.quantidade, 2)
            }
        };
    }

    carrinho = await updateTotalCarrinho(carrinho);

    return carrinho;

}

export const removeProdutoCarrinho = async (produto) => {

    let carrinho = await getCarrinhoStorage();

    let index = carrinho.produtos.findIndex(x => x.id == produto.id);

    if (index > -1) {

        carrinho.produtos.splice(index, 1);

    }

    carrinho = await updateTotalCarrinho(carrinho);

    return carrinho;

}

export const limparCarrinho = async () => {

    try {
        await AsyncStorage.removeItem('carrinho');
    } catch(e) { }

}

const updateTotalCarrinho = async (carrinho) => {

    carrinho.total = round(carrinho.produtos.map(p => (+p.valor * p.quantidade)).reduce((a, b) => a + b, 0), 2);
    carrinho.quantidade = carrinho.produtos.length;

    await setCarrinhoStorage(carrinho);

    return carrinho;

}