import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import * as ApiService from '../services/api.service';

const Cardapio = () => {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        const getLista = async () => {

            try {

                // ApiService.crudGet('', null);
                // const response = await axios.get('URL_DA_SUA_API');
                // setProdutos(response.data);

                setProdutos([
                    {
                        id: 1,
                        nome: 'teste',
                        descricao: 'teste2',
                        imagem: ''
                    },
                    {
                        id: 2,
                        nome: 'teste22',
                        descricao: 'teste233',
                        imagem: ''
                    }
                ])

            } catch (error) {

                console.error('Erro ao carregar os dados:', error);

            }

        };
    
        getLista();

    }, []);

    return (
        <>
            <Header>
            </Header>

            <Body>
                <FlatList
                    data={produtos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.produto}>
                            <Text>{item.nome}</Text>
                            <Text>{item.descricao}</Text>
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
    produto: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: 'start',
        borderBottomColor: '#ededed',
    }
});