import { Pressable, StyleSheet, View, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

import * as UsuarioService from '../services/usuario.service';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Menu = () => {

    const navigation = useNavigation();

    const _handleNavigationPress = (destination) => {

        navigation.navigate(destination);

    };

    const _handleLogout = () => {

        UsuarioService.removeUsuarioStorage();

    }

    const _handleFaleConosco = () => {

        const numeroTelefone = '5531991361426';
        const mensagem = 'Olá, gostaria de tirar algumas dúvidas.';

        let url = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;

        Linking.openURL(url);

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

                    <Pressable style={styles.btnNavegacao} onPress={() => _handleFaleConosco()}>
                        <FontAwesome5
                            name="whatsapp"
                            style={styles.icon}
                            size={26}>
                        </FontAwesome5>
                        <Text style={styles.texto}>Fale Conosco</Text>
                    </Pressable>

                    <Pressable style={styles.btnNavegacao} onPress={() => _handleNavigationPress('HistoricoPedidos')}>
                        <FontAwesome5
                            name="receipt"
                            style={styles.icon}
                            size={26}>
                        </FontAwesome5>
                        <Text style={styles.texto}>Meus Pedidos</Text>
                    </Pressable>

                    <Pressable style={styles.btnNavegacao} onPress={() => _handleLogout()}>
                        <FontAwesome5
                            name="sign-out-alt"
                            style={styles.icon}
                            size={26}>
                        </FontAwesome5>
                        <Text style={styles.texto}>Sair</Text>
                    </Pressable>
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
        marginTop: '5rem'
    },
    btnNavegacao: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ECECEC',
        borderBottomWidth: '1px',
        borderBottomColor: '#fff',
        paddingHorizontal: '1rem',
        paddingVertical: '0.5rem'
    },
    icon: {
        width: '40px',
        marginRight: '0.5rem'
    },
    texto: {
        fontSize: '18px'
    }
});