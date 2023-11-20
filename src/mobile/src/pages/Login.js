import { Text } from 'react-native-paper';
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as UsuarioService from '../services/usuario.service';
import UsuarioServiceClass from '../services/usuario.service';
import { postLogin } from '../services/login.service';

const Login = () => {

    const navigation = useNavigation();

    const [senha, setSenha] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const logar = async () => {
        try {
            if (email && senha) {
                let usuarioDados = await postLogin(email, senha);
                console.log(usuarioDados)
                console.log(usuarioDados.res.accessToken)
                if (usuarioDados && usuarioDados.res.accessToken) {
                    UsuarioService.setUsuarioStorage(usuarioDados);
                    UsuarioServiceClass.usuarioLogadoChangeObservable.next(true);
                    navigation.navigate('Cardapio')
                } else {
                    setModalMessage('Usuário ou senha inválidos!');
                    setModalVisible(true);
                }
            } else {
                setModalMessage('Necessário informar usuário e senha!');
                setModalVisible(true);
            }
        } catch (err) {
            UsuarioService.removeUsuarioStorage();
            setModalMessage(err.message);
            setModalVisible(true);
        }
    };

    return (
        <View style={{marginTop: 250}}>
            <Text style={styles.titulo}>
                1999 Burguer
            </Text>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.inputEmail}
                    placeholder="Email"
                    keyboardType="string"
                    value={email}
                    onChangeText={(texto) => setEmail(texto)}
                />
            </View>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.inputSenha}
                    placeholder="Senha"
                    placeholderTextColor="#000000"
                    value={senha}
                    onChangeText={(texto) => setSenha(texto)}
                    secureTextEntry={hidePass}
                />

                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => setHidePass(!hidePass)}>
                    {hidePass ? (
                        <Ionicons name="eye" color="#FFFFFF" size={25} />
                    ) : (
                        <Ionicons name="eye-off" color="#FFFFFF" size={25} />
                    )}
                </TouchableOpacity>
            </View>

            <Button title="Acessar" color="red" onPress={logar} />

            <Button title="Cadastrar" color="gray"
                onPress={() => { navigation.navigate('Cadastro'); }}
            />

            <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <Button style={styles.modalButton}title="OK" onPress={() => setModalVisible(false)}  color="red"/>
                    </View>
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputEmail: {
        fontSize: 18,
        color: '#000000',
        width: '100%',
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputSenha: {
        fontSize: 18,
        color: '#000000',
        width: '85%',
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: '15%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalMessage: {
        fontSize: 18,
        marginBottom: 20,
    }
});

export default Login;