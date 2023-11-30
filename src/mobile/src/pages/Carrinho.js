import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import LoadingAnimation from '../components/Loading';
import * as CarrinhoService from '../services/carrinho.service';
import * as ApiService from '../services/api.service';

const Carrinho = () => {

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const [produtos, setProdutos] = useState([]);
    const [carrinhoTela, setCarrinhoTela] = useState({});

    useEffect(() => {

        getLista();

    }, []);

    const getLista = async () => {

        const carrinho = await CarrinhoService.getCarrinhoStorage();

        if (!carrinho?.produtos?.length) {

            Toast.show({
                type: 'success',
                text1: 'Carrinho vazio!',
                position: 'bottom'
            });

            navigation.navigate('Cardapio');

        }

        setCarrinhoTela(carrinho);

        setProdutos(carrinho.produtos);

    };

    const _handleAddCarrinho = async (produto) => {

        produto.quantidade += 1;

        await CarrinhoService.updateProdutoCarrinho(produto);

        getLista();

    }

    const _handleRemoveCarrinho = async (produto) => {

        produto.quantidade -= 1;

        if (produto.quantidade > 0) {

            await CarrinhoService.updateProdutoCarrinho(produto);

        } else {

            await CarrinhoService.removeProdutoCarrinho(produto);

            Toast.show({
                type: 'success',
                text1: 'Removido do carrinho!',
                position: 'bottom'
            });

        }

        getLista();

    }

    const _finalizarCarrinho = async () => {

        const usuarioLogado = await JSON.parse(localStorage.getItem('usuario'));

        if (!usuarioLogado?.accessToken) {

            Toast.show({
                type: 'success',
                text1: 'Faça o login para continuar!',
                position: 'bottom'
            });

            navigation.navigate('Login');

            return;

        }

        const carrinho = await CarrinhoService.getCarrinhoStorage();

        if (!carrinho?.produtos?.length) {

            Toast.show({
                type: 'success',
                text1: 'Carrinho vazio!',
                position: 'bottom'
            });

        }

        setLoading(true);

        const result = await ApiService.crudPost('/order/create', carrinho, null, true);

        setLoading(false);

        if (result.res?.errors) {

            Toast.show({
                type: 'success',
                text1: 'Erro ao finalizar carrinho!',
                text2: `${result.res.errors?.default || ''}`,
                position: 'bottom'
            });

        } else {

            await CarrinhoService.limparCarrinho();

            setProdutos(null);
            setCarrinhoTela(null);

            Toast.show({
                type: 'success',
                text1: 'Carrinho finalizado!',
                position: 'bottom'
            });

            navigation.navigate('HistoricoPedidos');

        }

    }

    return (
        <>
            { loading && <LoadingAnimation/> }
            <Header>
            </Header>

            <Body>
                <FlatList
                    style={styles.listaProdutos}
                    data={produtos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.produto}>
                            <View style={styles.infos}>
                                <View style={styles.blocoDescricao}>
                                    <Text style={styles.nome}>{item.nome}</Text>
                                    <Text style={styles.descricao}>{item.quantidade} un</Text>
                                </View>

                                <View style={styles.blocoImagem}>
                                    <Image style={styles.imagem} source={item.imagem || require('../../assets/burguer.png')} />
                                    <Text style={styles.valor}>R$ {(+item.total).toFixed(2).replace('.', ',')}</Text>
                                </View>
                            </View>

                            <View style={styles.botoes}>
                                <Pressable style={styles.btnRemoveCarrinho} onPress={() => _handleRemoveCarrinho(item)}>
                                    <FontAwesome5
                                        style={styles.iconeRemoveCarrinho}
                                        name="minus">
                                    </FontAwesome5>
                                </Pressable>

                                <Pressable style={styles.btnRemoveCarrinho} onPress={() => _handleAddCarrinho(item)}>
                                    <FontAwesome5
                                        style={styles.iconeRemoveCarrinho}
                                        name="plus">
                                    </FontAwesome5>
                                </Pressable>

                                {/* <Pressable style={styles.btnRemoveCarrinho} onPress={() => _handleRemoveCarrinho(item)}>
                                    <FontAwesome5
                                        style={styles.iconeRemoveCarrinho}
                                        name="trash">
                                    </FontAwesome5>
                                </Pressable> */}
                            </View>
                        </View>
                    )}
                />

                <View style={styles.botoesRodape}>
                    <Pressable style={styles.btnFinalizar} onPress={() => _finalizarCarrinho()}>
                        <Text style={styles.textoBtnFinalizar}>
                            Finalizar Compra { `R$ ${(carrinhoTela?.total || 0).toFixed(2).replace('.', ',')}` }
                        </Text>
                    </Pressable>
                </View>
            </Body>

            <Footer tabIndex={1} />
        </>
    );

}
export default Carrinho;

const styles = StyleSheet.create({
    listaProdutos: {
        width: '100%',
        marginTop: '1rem',
        paddingHorizontal: '1rem',
    },
    produto: {
        width: '100%',
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        marginBottom: '2rem',
        paddingVertical: '0.5rem',
        paddingHorizontal: '0.5rem',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    infos: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "start",
        gap: '0.75rem'
    },
    blocoDescricao: {
        flexDirection: 'column',
        flex: 'auto'
    },
    nome: {
        fontSize: '22px',
        fontWeight: '500',
        marginBottom: '1rem'
    },
    descricao: {
        fontSize: '16px'
    },
    blocoImagem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    imagem: {
        maxWidth: '100%',
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        position: 'relative',
        marginBottom: '0.5rem'
    },
    valor: {
        fontSize: '20px',
        fontWeight: '600'
    },
    botoes: {
        marginTop: '1rem',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'flex-end'
    },
    picker: {
        height: '40px',
        width: '100px',
        borderRadius: '8px'
    },
    btnRemoveCarrinho: {
        width: '36px',
        height: '36px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        padding: '0.4rem',
        borderRadius: '8px',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconeRemoveCarrinho: {
        color: '#fff',
        fontSize: '24px'
    },
    botoesRodape: {
        width: '100%',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        alignItems: 'center',
        paddingHorizontal: '0.5rem'
    },
    btnFinalizar: {
        width: '100%',
        height: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        paddingVertical: '0.4rem',
        paddingHorizontal: '0.6rem',
        borderRadius: '8px',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    textoBtnFinalizar: {
        color: '#FFF',
        fontWeight: 600,
        fontSize: '1.2rem'
    }
});