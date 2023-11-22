import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

const Body = ({ children }) => {

    return <View style={styles.body}>
        {children}
        <View style={styles.toast}>
            <Toast />
        </View>
    </View>

}
export default Body;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toast: {
        zIndex: 9
    }
});