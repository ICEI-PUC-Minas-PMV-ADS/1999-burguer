import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        let userMem = await AsyncStorage.getItem('usuario');
        const usuarioLogado = userMem ? JSON.parse(userMem) : null;

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
        marginTop: 16,
        paddingHorizontal: 16,
    },
    produto: {
        width: '100%',
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginBottom: 32,
        paddingVertical: 8,
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    infos: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "start",
        gap: 12
    },
    blocoDescricao: {
        flexDirection: 'column',
        flex: 'auto'
    },
    nome: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 16
    },
    descricao: {
        fontSize: 16
    },
    blocoImagem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    imagem: {
        maxWidth: '100%',
        width: 80,
        height: 80,
        borderRadius: 8,
        position: 'relative',
        marginBottom: 8
    },
    valor: {
        fontSize: 20,
        fontWeight: '600'
    },
    botoes: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 32,
        alignItems: 'flex-end'
    },
    picker: {
        height: 40,
        width: 100,
        borderRadius: 8
    },
    btnRemoveCarrinho: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        padding: 6.4,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconeRemoveCarrinho: {
        color: '#fff',
        fontSize: 24
    },
    botoesRodape: {
        width: '100%',
        marginTop: 8,
        marginBottom: 8,
        alignItems: 'center',
        paddingHorizontal: 8
    },
    btnFinalizar: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        paddingVertical: 6.4,
        paddingHorizontal: 9.6,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    textoBtnFinalizar: {
        color: '#FFF',
        fontWeight: 600,
        fontSize: 19.2
    }
});