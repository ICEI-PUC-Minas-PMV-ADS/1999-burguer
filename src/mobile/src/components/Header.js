import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {

    const navigation = useNavigation();

    const _handleFaleConosco = () => {
        
        const numeroTelefone = '5531991361426';
        const mensagem = 'Olá, gostaria de tirar algumas dúvidas.';

        let url = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;

        Linking.openURL(url);

    }

    const _handleCardapio = () => {
        navigation.navigate('Cardapio');
    }

    return (
        <View style={styles.header}>
            <Pressable onPress={() => _handleCardapio()}>
                <Image source={require('../../assets/logo.jpg')} style={styles.logo}/>
            </Pressable>

            <TouchableOpacity title="whatsapp" onPress={() => _handleFaleConosco()}>
                <FontAwesome5
                    name="whatsapp"
                    style={styles.icone}
                    size={40}>
                </FontAwesome5>
            </TouchableOpacity>
        </View>
    );

}
export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
    },
    logo: {
        maxWidth: '100%',
        width: 50,
        height: 50,
        borderRadius: 8,
        position: 'relative'
    }
});