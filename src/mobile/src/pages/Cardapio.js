import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Image, Pressable, Picker } from 'react-native';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import * as ApiService from '../services/api.service';
import { FontAwesome5 } from '@expo/vector-icons';

const Cardapio = () => {

    const [produtos, setProdutos] = useState([]); 3
    const [selectedValue, setSelectedValue] = useState('1');

    useEffect(() => {

        const getLista = async () => {

            const result = await ApiService.crudGet('/cardapio', null);

            if (result.error) {
                console.error('Erro ao carregar os dados', result.error.message)
            }

            if (result.res?.length) {
                setProdutos(result.res);

            }

        };

        getLista();

    }, []);

    const _handleAddCarrinho = (produtoId) => {

        console.log(produtoId)

    }

    const valoresSelecao = Array.from({ length: 10 }, (_, index) => {
        const value = (index + 1).toString();
        return <Picker.Item key={value} label={value} value={value} />;
    });

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
                                    <Text style={styles.descricao}>{item.descricao}</Text>
                                </View>

                                <View style={styles.blocoImagem}>
                                    <Image style={styles.imagem} source={item.imagem || require('../../assets/burguer.png')} />
                                    <Text style={styles.valor}>R$ {(+item.valor).toFixed(2).replace('.', ',')}</Text>
                                </View>
                            </View>

                            <View style={styles.botoes}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={selectedValue}>
                                    {valoresSelecao}
                                </Picker>

                                <Pressable style={styles.btnAddCarrinho} onPress={() => _handleAddCarrinho(item.id)}>
                                    <FontAwesome5
                                        style={styles.iconeAddCarrinho}
                                        name="cart-plus">
                                    </FontAwesome5>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </Body>

            <Footer tabIndex={0} />
        </>
    );

}
export default Cardapio;

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
    btnAddCarrinho: {
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
    iconeAddCarrinho: {
        color: '#fff',
        fontSize: '30px'
    }
});