import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import Main from './src/Main';

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
            <Toast />
        </SafeAreaProvider>
    );
}