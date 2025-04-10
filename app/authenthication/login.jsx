import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase/firebaseConfig.jsx';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();
const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible] = useState(false);
    const [request, response, /* inicia sesión en ventana externa*/ promptAsync] = Google.useAuthRequest({
        webClientId: '61966159852-30er87tn5uojd5l0p8ndhriu144tpuj0.apps.googleusercontent.com',
        expoClientId: '61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com',
        androidClientId: '61966159852-jp4u85h56v7f36gnf1mq8lqn1u70gh24.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(() => {
                    Alert.alert('Éxito', 'Inicio de sesión con Google correcto');
                })
                .catch(error => {
                    Alert.alert('Error', error.message);
                });
        }
    }, [response]);

    const handleLogin = async (typeLogin) => {
        try {
            switch (typeLogin) {
                case 0: // Login con email/password
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    if (!emailRegex.test(email)) {
                        Alert.alert('Error', 'Por favor ingresa un correo válido');
                        return;
                    }
                    if (password.length < 6) {
                        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
                        return;
                    }
                    if (typeLogin === 0 && !password) {
                        Alert.alert('Error', 'Por favor ingresa tu contraseña');
                        return;
                    }
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    Alert.alert('Éxito', 'Inicio de sesión correcto');
                    break;
                    
                case 1: // Login con Google
                    await promptAsync();
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
                style={{ width: '80%', margin: 10, padding: 10, borderWidth: 1 }}
            />

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                style={{ width: '80%', margin: 10, padding: 10, borderWidth: 1 }}
            />

            <Button 
                title="Iniciar Sesión" 
                onPress={() => handleLogin(0)}
            />
            <Button 
                title="Registrarse" 
                onPress={() => navigation.navigate('SignIn')} 
            />
            
            <TouchableOpacity 
                onPress={() => handleLogin(1)}
                disabled={!request}
            >
                <Image 
                    style={{ width: 70, height: 70, marginTop: 20 }}
                    source={require('../../assets/images/logo_google.png')} 
                />
            </TouchableOpacity>
        </View>
    );
};

export default Login;
