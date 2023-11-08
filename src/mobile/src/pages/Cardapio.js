import { Text } from 'react-native-paper';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Cardapio = () => {

    return (
        <>
            <Header>
            </Header>

            <Body>
                <Text>Cardápio</Text>
            </Body>

            <Footer tabIndex={0} />
        </>
    );

}
export default Cardapio;