import { Pressable, StyleSheet, View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as UsuarioService from '../services/usuario.service';
import UsuarioServiceClass from '../services/usuario.service';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Menu = () => {

    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {

        getUsuario();

    }, []);

    const getUsuario = async () => {

        let userMem = await AsyncStorage.getItem('usuario');
        const usuarioLogado = userMem ? JSON.parse(userMem) : null;

        setUsuario(usuarioLogado);

    }

    const _handleNavigationPress = (destination) => {

        navigation.navigate(destination);

    };

    const _handleLogout = async () => {

        await UsuarioService.removeUsuarioStorage();

        UsuarioServiceClass.usuarioLogadoChangeObservable.next(false);

        navigation.navigate('Cardapio');

    }

    const _handleFaleConosco = () => {

        const numeroTelefone = '5531991361426';
        const mensagem = 'Olá, gostaria de tirar algumas dúvidas.';

        let url = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;

        Linking.openURL(url);

    }

    const _handleLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <>
            <Header>
            </Header>

            <Body>
                <View style={styles.lista}>
                    <Pressable style={styles.btnNavegacao} onPress={() => _handleNavigationPress('MeusDados')}>
                        <FontAwesome5
                            name="user-edit"
                            style={styles.icon}
                            size={26}>
                        </FontAwesome5>
                        <Text style={styles.texto}>Meus Dados</Text>
                    </Pressable>

                    <Pressable style={styles.btnNavegacao} onPress={() => _handleNavigationPress('HistoricoPedidos')}>
                        <FontAwesome5
                            name="receipt"
                            style={styles.icon}
                            size={26}>
                        </FontAwesome5>
                        <Text style={styles.texto}>Meus Pedidos</Text>
                    </Pressable>

                    <Pressable style={styles.btnNavegacao} onPress={() => _handleFaleConosco()}>
                        <FontAwesome5
                            name="whatsapp"
                            style={styles.icon}
                            size={26}>
                        </FontAwesome5>
                        <Text style={styles.texto}>Fale Conosco</Text>
                    </Pressable>

                    {usuario && (
                        <Pressable style={styles.btnNavegacao} onPress={() => _handleLogout()}>
                            <FontAwesome5
                                name="sign-out-alt"
                                style={styles.icon}
                                size={26}>
                            </FontAwesome5>
                            <Text style={styles.texto}>Sair</Text>
                        </Pressable>
                    )}

                    {!usuario && (
                        <Pressable style={styles.btnNavegacao} onPress={() => _handleLogin()}>
                            <FontAwesome5
                                name="sign-out-alt"
                                style={styles.icon}
                                size={26}>
                            </FontAwesome5>
                            <Text style={styles.texto}>Login</Text>
                        </Pressable>
                    )}

                </View>
            </Body>

            <Footer tabIndex={3} />
        </>
    );

}
export default Menu;

const styles = StyleSheet.create({
    lista: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        marginTop: 80
    },
    btnNavegacao: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ECECEC',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    icon: {
        width: 40,
        marginRight: 8
    },
    texto: {
        fontSize: 18
    }
});