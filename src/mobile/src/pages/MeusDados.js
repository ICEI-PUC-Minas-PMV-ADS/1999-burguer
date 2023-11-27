import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import { getUsuarioStorage } from '../services/usuario.service';
import { crudGetById } from '../services/api.service';
import LoadingAnimation from '../components/Loading';

const MeusDados = () => {

    const navigation = useNavigation();

    const [novosDados, setNovosDados] = useState({});
    const [dados, setDados] = useState({});
    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserDados();
    }, []);

    const getUserDados = async () => {

        try {

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

            setLoading(true);

            const usuarioDados = await getUsuarioStorage();
            const apiResponse = await crudGetById('/user', usuarioDados.userId);

            setDados(apiResponse.res);
            setLoading(false);

        } catch (error) {

            console.error('Erro ao carregar dados:', error);
            setLoading(false);

        }

    }

    const handleInputChange = (campo, valor) => {

        setNovosDados({ ...novosDados, [campo]: valor });

    }

    const salvarAlteracoes = async () => {

        setDados(novosDados);
        setEditando(false);

        await enviarDadosParaAPI(novosDados);

    }

    const enviarDadosParaAPI = async (dadosParaEnviar) => {
        console.log('Enviando dados para o servidor:', dadosParaEnviar);
    }

    return (
        <>
            {loading && <LoadingAnimation />}
            <Header>
            </Header>

            <Body>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Meus Dados</Text>
                    {editando ? (
                        <>
                            <Text style={styles.label}>Nome:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.nome}
                                value={novosDados.nome}
                                onChangeText={(texto) => handleInputChange('nome', texto)}
                            />
                            <Text style={styles.label}>E-mail:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.email}
                                value={novosDados.email}
                                onChangeText={(texto) => handleInputChange('email', texto)}
                            />
                            <Text style={styles.label}>Endereço:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.endereco}
                                value={novosDados.endereco}
                                onChangeText={(texto) => handleInputChange('endereco', texto)}
                            />
                            <Text style={styles.label}>Número:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.numero}
                                value={novosDados.numero}
                                onChangeText={(texto) => handleInputChange('numero', texto)}
                            />
                            <Text style={styles.label}>Bairro:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.bairro}
                                value={novosDados.bairro}
                                onChangeText={(texto) => handleInputChange('bairro', texto)}
                            />
                            <Text style={styles.label}>Cidade:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.cidade}
                                value={novosDados.cidade}
                                onChangeText={(texto) => handleInputChange('cidade', texto)}
                            />
                            <Text style={styles.label}>CEP:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.cep}
                                value={novosDados.cep}
                                onChangeText={(texto) => handleInputChange('cep', texto)}
                            />
                            <Text style={styles.label}>UF:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.uf}
                                value={novosDados.uf}
                                onChangeText={(texto) => handleInputChange('uf', texto)}
                            />
                            <Text style={styles.label}>Complemento:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.complemento}
                                value={novosDados.complemento}
                                onChangeText={(texto) => handleInputChange('complemento', texto)}
                            />
                            <Text style={styles.label}>Ponto de Referência:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.ponto_referencia}
                                value={novosDados.ponto_referencia}
                                onChangeText={(texto) => handleInputChange('ponto_referencia', texto)}
                            />
                            <Text style={styles.label}>Telefone:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={dados.telefone}
                                value={novosDados.telefone}
                                onChangeText={(texto) => handleInputChange('telefone', texto)}
                            />

                        </>
                    ) : (
                        <>
                            <Text style={styles.infoText}>Nome: {dados.nome}</Text>
                            <Text style={styles.infoText}>Email: {dados.email}</Text>
                            <Text style={styles.infoText}>Endereço: {dados.endereco}, {dados.numero}</Text>
                            <Text style={styles.infoText}>Bairro: {dados.bairro}</Text>
                            <Text style={styles.infoText}>Cidade: {dados.cidade}, CEP: {dados.cep}</Text>
                            <Text style={styles.infoText}>UF: {dados.uf}</Text>
                            <Text style={styles.infoText}>Complemento: {dados.complemento}</Text>
                            <Text style={styles.infoText}>Ponto de Referência: {dados.ponto_referencia}</Text>
                            <Text style={styles.infoText}>Telefone: {dados.telefone}</Text>
                        </>

                    )}
                    <View style={{ marginTop: 0, alignItems: 'center' }}></View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={editando ? salvarAlteracoes : () => setEditando(true)}
                        >
                            <Text style={styles.buttonText}>{editando ? "Salvar Alterações" : "Editar"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Página Anterior')}
                        >
                            <Text style={styles.buttonText}>Voltar</Text>
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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: '#f0f0f0',
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
        borderRadius: 5,
        color: 'black',
        backgroundColor: 'white',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 20,
        marginLeft: 40,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#EA6419',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    }
});