import { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BehaviorSubject } from 'rxjs';

export default class UsuarioServiceClass extends Component {

    static usuarioLogadoChangeObservable = new BehaviorSubject(false);

    render() {
        return null;
    }

}

export const setUsuarioStorage = async (usuario) => {

    if (!usuario) return;

    await AsyncStorage.setItem(
        'usuario',
        JSON.stringify(usuario.res)
    );

};

export const getUsuarioStorage = async () => {

    let usuario = await AsyncStorage.getItem('usuario');

    return usuario ? JSON.parse(usuario) : null;

};

export const temUsuarioLogado = async () => {

    const usuario = await getUsuarioStorage();

    return !!usuario;

};

export const removeUsuarioStorage = async () => {

    await AsyncStorage.removeItem('usuario');

};