import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title }) => {

    return (
        <Appbar.Header style={styles.header}>
            {/* <Appbar.Content title="Fitness Control" titleStyle={styles.title} /> */}
        </Appbar.Header>
    );

}
export default Header;

const styles = {
    header: {
        backgroundColor: '#ffffff'
    },
    // title: {
    //     color: '#ffffff',
    //     alignSelf: 'center', // centralizar o título
    // }
};