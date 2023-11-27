import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UsuarioServiceClass from './services/usuario.service';
import * as UsuarioService from './services/usuario.service';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Cardapio from './pages/Cardapio';
import Carrinho from './pages/Carrinho';
import HistoricoPedidos from './pages/HistoricoPedidos';
import Menu from './pages/Menu';
import MeusDados from './pages/MeusDados';

const Stack = createNativeStackNavigator();

const Main = () => {

    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {

        // EVENTO DE ALTERACAO DO USUARIO
        UsuarioServiceClass.usuarioLogadoChangeObservable.subscribe(usuario => {

            loadUsuarioLogado();

        });

        async function loadUsuarioLogado() {

            const usuario = await UsuarioService.temUsuarioLogado();

            setUsuarioLogado(usuario);

        }

        loadUsuarioLogado();

    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cardapio" component={Cardapio} />
            <Stack.Screen name="Carrinho" component={Carrinho} />
            <Stack.Screen name="HistoricoPedidos" component={HistoricoPedidos} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="MeusDados" component={MeusDados} />
            {
                !usuarioLogado &&
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                </>
            }
        </Stack.Navigator>
    );

}
export default Main;