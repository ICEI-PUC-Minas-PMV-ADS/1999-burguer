import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import * as CarrinhoService from '../services/carrinho.service';

const Carrinho = () => {

    const navigation = useNavigation();

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        getLista();

    }, []);

    const getLista = async () => {

        const carrinho = await CarrinhoService.getCarrinhoStorage();

        if (!carrinho?.produtos?.length) {
            console.error('Carrinho vazio');

            navigation.navigate('Cardapio');
        }

        setProdutos(carrinho.produtos);

    };

    const _handleRemoveCarrinho = async (produto) => {

        await CarrinhoService.removeProdutoCarrinho(produto);

        Toast.show({
            type: 'success',
            text1: 'Removido do carrinho!',
            position: 'bottom'
        });

        getLista();

    }

    const _finalizarCarrinho = async () => {

        console.log('chamar rota para gravar carrinho');

        await CarrinhoService.limparCarrinho();

        navigation.navigate('Cardapio');

        Toast.show({
            type: 'success',
            text1: 'Carrinho finalizado!',
            position: 'bottom'
        });

    }

    return (
        <>
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
                                        name="trash">
                                    </FontAwesome5>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />

                <View style={styles.botoesRodape}>
                    <Pressable style={styles.btnFinalizar} onPress={() => _finalizarCarrinho()}>
                        <Text style={styles.textoBtnFinalizar}>Finalizar Compra</Text>
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
        borderRadius: '5px',
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
        borderRadius: '5px',
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
        borderRadius: '5px'
    },
    btnRemoveCarrinho: {
        width: '50px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        padding: '0.4rem',
        borderRadius: '5px',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconeRemoveCarrinho: {
        color: '#fff',
        fontSize: '30px'
    },
    botoesRodape: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        alignItems: 'center'
    },
    btnFinalizar: {
        width: '11rem',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E39568',
        padding: '0.4rem',
        borderRadius: '5px',
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