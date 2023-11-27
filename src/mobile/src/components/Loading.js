import { Modal, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingAnimation = () => {
    return (
        <Modal transparent={true}>
            <View style={styles.indicatorWrapper}>
                <ActivityIndicator size="large" color='#f1f1f1' />
                <Text style={styles.indicatorText}></Text>
            </View>
        </Modal>
    );
}
export default LoadingAnimation;

const styles = StyleSheet.create({
    indicatorWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.6)',
    },
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
});