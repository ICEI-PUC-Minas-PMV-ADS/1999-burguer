import { Text } from 'react-native-paper';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Carrinho = () => {

    return (
        <>
            <Header>
            </Header>

            <Body>
                <Text>Carrinho</Text>
            </Body>

            <Footer tabIndex={1} />
        </>
    );

}
export default Carrinho;