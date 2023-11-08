import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Footer = ({ tabIndex }) => {

    const navigation = useNavigation();

    let menuTabIndex = tabIndex || 0;

    const handleBottomNavigationPress = (destination, newTabIndex) => {

        menuTabIndex = newTabIndex;
        navigation.navigate(destination);

    };

    return (
        <View style={styles.bottomNavigationContainer}>
            <Pressable style={styles.navigationButton} onPress={() => handleBottomNavigationPress('Cardapio', 0)}>
                {
                    menuTabIndex == 0 ? (
                        <FontAwesome5
                            name="hamburger"
                            style={styles.selectedNavigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    ) : (
                        <FontAwesome5
                            name="hamburger"
                            style={styles.navigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    )
                }
            </Pressable>

            <Pressable style={styles.navigationButton} onPress={() => handleBottomNavigationPress('Carrinho', 1)}>
                {
                    menuTabIndex == 1 ? (
                        <FontAwesome5
                            name="shopping-cart"
                            style={styles.selectedNavigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    ) : (
                        <FontAwesome5
                            name="shopping-cart"
                            style={styles.navigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    )
                }
            </Pressable>

            <Pressable style={styles.navigationButton} onPress={() => handleBottomNavigationPress("HistoricoPedidos", 2)}>
                {
                    menuTabIndex == 2 ? (
                        <FontAwesome5
                            name="receipt"
                            style={styles.selectedNavigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    ) : (
                        <FontAwesome5
                            name="receipt"
                            style={styles.navigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    )
                }
            </Pressable>

            <Pressable style={styles.navigationButton} onPress={() => handleBottomNavigationPress('Menu', 3)}>
                {
                    menuTabIndex == 3 ? (
                        <FontAwesome5
                            name="user-alt"
                            style={styles.selectedNavigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    ) : (
                        <FontAwesome5
                            name="user-alt"
                            style={styles.navigationButtonIcon}
                            size={26}>
                        </FontAwesome5>
                    )
                }
            </Pressable>
        </View>
    );
}
export default Footer;

const styles = StyleSheet.create({
    bottomNavigationContainer: {
        width: '100%',
        height: 76,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center'
    },
    navigationButton: {
        alignItems: 'center',
    },
    navigationButtonIcon: {
        color: '#EA6419',
    },
    selectedNavigationButtonIcon: {
        color: '#EA6419',
    }
});