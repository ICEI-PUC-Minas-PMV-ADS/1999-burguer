import React from 'react';
import { StyleSheet, View } from 'react-native';

const Body = ({ children }) => {

    return <View style={styles.body}>
        {children}
    </View>

}
export default Body;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center'
    }
});