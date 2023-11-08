import { Text } from 'react-native-paper';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const HistoricoPedidos = () => {

    return (
        <>
            <Header>
            </Header>

            <Body>
                <Text>Histórico Pedidos</Text>
            </Body>

            <Footer tabIndex={2} />
        </>
    );

}
export default HistoricoPedidos;