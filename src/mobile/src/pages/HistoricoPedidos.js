import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';
import * as ApiService from '../services/api.service';
import * as UsuarioService from '../services/usuario.service'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';


const HistoricoPedidos = () => {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        const getLista = async () => {
            try {
                const result = await ApiService.crudGet('/orders', {}, true);
                

                if (result.error) {
                    console.log('Erro ao carregar os dados', result.error.message);
                }

                const usuarioLogado = await UsuarioService.getUsuarioStorage()

                if (result.res?.rows.length) {

                    const pedidosComStatus3 =
                        result.res.rows.filter
                            (
                                item =>
                                    item.status === 3
                                    &&
                                    item.usuario_id == usuarioLogado.userId);

                    setPedidos(pedidosComStatus3);
                }
            } catch (error) {
                console.error('Erro ao executar o efeito:', error);
            }
        };

        getLista();
    }, [])

    return (
        <>
            <Header>
            </Header>

            <Body>
                <FlatList
                    style={styles.listaPedidos}
                    data={pedidos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.pedido}>
                            <View>
                                <Text style={styles.textosPedido} >Ticket: {item.id}</Text>
                                <Text style={styles.textosPedido} >Bairro: {item.bairro}</Text>
                                <Text style={styles.textosPedido} >CEP: {item.cep}</Text>
                                <Text style={styles.textosPedido}>
                                    Finalizado em: {new Date(item.data_finalizacao).toLocaleDateString()}
                                </Text>
                            </View>
                            <View style={styles.textosPedido}>
                                <Text style={styles.textosPedido} >Endereço: {item.endereco}</Text>
                                <Text style={styles.textosPedido} >Nº: {item.numero}</Text>
                                <Text style={styles.textosPedido} >Status: {item.status === 3 ? 'Concluído' : item.status}</Text>
                                <Text style={styles.textosPedido} >Total: {item.total}</Text>
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


const styles = StyleSheet.create({
    listaPedidos: {
        width: '100%',
        marginTop: '1rem',
        paddingHorizontal: '1rem',
    },
    pedido: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        gap: '0.75rem',
        width: '100%',
        backgroundColor: '#fafafa',
        borderRadius: '5px',
        marginBottom: '2rem',
        paddingVertical: '0.5rem',
        paddingHorizontal: '0.5rem',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: '#ea6419'
    },
    textosPedido: {
        fontSize: '16px',
        fontWeight: '600',
        color: 'white'
    }
});