import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase/firebaseConfig.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async (typeLogin) => {

        try {
            switch (typeLogin) {
                case 0: // Login con email/password
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(email)) {
                    Alert.alert('Error', 'Por favor ingresa un correo válido');
                    return;
                }
                if (typeLogin === 0 && !password) {
                    Alert.alert('Error', 'Por favor ingresa tu contraseña');
                    return;
                }
                    await signInWithEmailAndPassword(auth, email, password);
                    Alert.alert('Éxito', 'Inicio de sesión correcto');
                    break;
                    
                case 1: // Login con Google
                    Alert.alert('Login con Google');
                    break;
                default:
                    break;
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text>Iniciar Sesión</Text>

            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
            />

            <Button 
                title="Iniciar Sesión" 
                onPress={() => handleLogin(0)}
            />
            <TouchableOpacity onPress={() => handleLogin(1)}>
            <Image style={{ width: 70, height: 70, }}
                source={require('../../assets/images/logo_google.png')} 
            />;
            </TouchableOpacity>
          
          
        </View>
    );
};

export default Login;