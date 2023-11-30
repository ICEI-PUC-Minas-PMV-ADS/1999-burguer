import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import * as ApiService from '../services/api.service';
import LoadingAnimation from '../components/Loading';

const HistoricoPedidos = () => {

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {

        getLista();

    }, []);

    const getLista = async () => {

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

            const result = await ApiService.crudGet('/orders', {}, true);

            setLoading(false);

            if (result.error) {
                console.log('Erro ao carregar os dados', result.error.message);
            }

            if (result.res?.rows.length) {

                const pedidosComStatus3 =
                    result.res.rows.filter
                        (
                            item =>
                                item.usuario_id == usuarioLogado.userId);

                setPedidos(pedidosComStatus3);
            }

        } catch (error) {
            console.error('Erro ao executar o efeito:', error);
        }
    };

    return (
        <>
            {loading && <LoadingAnimation />}
            <Header>
            </Header>

            <Body>
                <FlatList
                    style={styles.listaPedidos}
                    data={pedidos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.pedido}>
                            <View style={styles.infoContainer}>
                                <PedidoItem label="Ticket" value={item.id} />
                                <PedidoItem label="Bairro" value={item.bairro} />
                                <PedidoItem label="CEP" value={item.cep} />
                                <PedidoItem label="Finalizado em" value={new Date(item.data_finalizacao).toLocaleDateString()} />
                            </View>
                            <View style={styles.infoContainer}>
                                <PedidoItem label="Endereço" value={item.endereco} />
                                <PedidoItem label="Nº" value={item.numero} />
                                <PedidoItem label="Status" value={item.status === 3 ? 'Concluído' : item.status} />
                                <PedidoItem label="Total" value={`R$${Number(item.total).toFixed(2)}`} />
                            </View>

                        </View>
                    )}


                />
            </Body>

            <Footer tabIndex={2} />
        </>
    );

}
export default HistoricoPedidos;

const PedidoItem = ({ label, value }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.textosPedido}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    listaPedidos: {
        width: '100%',
        marginTop: '1rem',
        paddingHorizontal: '1rem'
    },
    pedido: {
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',

    },
    textosPedido: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        flexShrink: 1,
        flex: 1

    },

    itemContainer: {
        flex: 1,
        marginBottom: 8,
        width: '100%'

    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EA6419',
        marginRight: 5
    },

    infoContainer: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 8,
    },
});