// ./authenthication/signin.js
import {React, useEffect}  from 'react';
import { View, Text } from 'react-native';
import { auth } from '../../firebase/firebaseConfig'; // Ajusta la ruta según tu estructura
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        // Listener que verifica si el usuario está autenticado
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // Si no hay usuario, redirige al login
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'login' }], 
                });
            }
        });

        return unsubscribe; // Limpia el listener al desmontar el componente
    }, []);

   return (
    <Text>Hola bbsita bb</Text>
   );
}

