import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import { getUsuarioStorage } from '../services/usuario.service';
import { crudGetById } from '../services/api.service';
import LoadingAnimation from '../components/Loading';

const MeusDados = () => {

    const navigation = useNavigation();

    const [dados, setDados] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserDados();
    }, []);

    const getUserDados = async () => {

        try {

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

            setLoading(true);

            const usuarioDados = await getUsuarioStorage();
            const apiResponse = await crudGetById('/user', usuarioDados.userId, true);

            setDados(apiResponse.res);
            setLoading(false);

        } catch (error) {

            console.error('Erro ao carregar dados:', error);
            setLoading(false);

        }

    }

    const handleInputChange = (campo, valor) => {

        setDados({ ...dados, [campo]: valor });

    }

    const salvarAlteracoes = async () => {

        await enviarDadosParaAPI(dados);

    }

    const enviarDadosParaAPI = async (dadosParaEnviar) => {
        console.log('Enviando dados para o servidor:', dadosParaEnviar);
    }

    const solicitarApagarDados = async () => {

        const numeroTelefone = '5531991361426';
        const mensagem = `Olá, gostaria solicitar a remoção dos meus dados.`;

        let url = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;

        Linking.openURL(url);

    }

    return (
        <>
            {loading && <LoadingAnimation />}
            <Header>
            </Header>

            <Body>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Meus Dados</Text>
                    <>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.nome}
                            onChangeText={(texto) => handleInputChange('nome', texto)}
                        />

                        <Text style={styles.label}>E-mail:</Text>
                        <TextInput
                            type='email'
                            style={styles.input}
                            placeholder=''
                            value={dados.email}
                            onChangeText={(texto) => handleInputChange('email', texto)}
                        />

                        <Text style={styles.label}>Endereço:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.endereco}
                            onChangeText={(texto) => handleInputChange('endereco', texto)}
                        />

                        <Text style={styles.label}>Número:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.numero}
                            onChangeText={(texto) => handleInputChange('numero', texto)}
                        />

                        <Text style={styles.label}>Bairro:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.bairro}
                            onChangeText={(texto) => handleInputChange('bairro', texto)}
                        />

                        <Text style={styles.label}>Cidade:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.cidade}
                            onChangeText={(texto) => handleInputChange('cidade', texto)}
                        />

                        <Text style={styles.label}>CEP:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.cep}
                            onChangeText={(texto) => handleInputChange('cep', texto)}
                        />

                        <Text style={styles.label}>UF:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.uf}
                            onChangeText={(texto) => handleInputChange('uf', texto)}
                        />

                        <Text style={styles.label}>Complemento:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.complemento}
                            onChangeText={(texto) => handleInputChange('complemento', texto)}
                        />

                        <Text style={styles.label}>Ponto de Referência:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.ponto_referencia}
                            onChangeText={(texto) => handleInputChange('ponto_referencia', texto)}
                        />

                        <Text style={styles.label}>Telefone:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=''
                            value={dados.telefone}
                            onChangeText={(texto) => handleInputChange('telefone', texto)}
                        />
                    </>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => salvarAlteracoes()}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.apagarContainer}>
                        <TouchableOpacity
                            style={styles.buttonApagar}
                            onPress={() => solicitarApagarDados()}>
                            <Text style={styles.buttonApagarText}>Apagar meus dados</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Body>

            <Footer />
        </>

    );

};
export default MeusDados;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: '#f0f0f0',
        overflow: 'scroll'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    infoText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '500',
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderColor: '#ccc',
    },
    input: {
        height: '8%',
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        backgroundColor: 'white',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#EA6419',
        width: '60%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
    apagarContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttonApagar: {
        backgroundColor: 'gray',
        width: '140px',
        height: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonApagarText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    },
});