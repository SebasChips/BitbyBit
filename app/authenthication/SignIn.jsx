// ./authenthication/signin.js
import React from 'react';
import { View, Text } from 'react-native';

const SignIn = () => {
  const con =
  return (
    <View>
    <Text>Registrarse</Text>
    <TextInput
      placeholder="Correo electrónico"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      style={{ width: '80%', margin: 10, padding: 10, borderWidth: 1 }}
    />

    <TextInput
        placeholder="Contraseña"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ width: '80%', margin: 10, padding: 10, borderWidth: 1 }}
    />

    <TextInput
        placeholder="Usuario"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ width: '80%', margin: 10, padding: 10, borderWidth: 1 }}
    />
    </View>
    
  );
};

export default SignIn; 