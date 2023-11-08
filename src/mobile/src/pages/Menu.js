import { Text } from 'react-native-paper';

import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

const Menu = () => {

    return (
        <>
            <Header>
            </Header>

            <Body>
                <Text>Menu</Text>
            </Body>

            <Footer tabIndex={3} />
        </>
    );

}
export default Menu;