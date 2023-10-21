import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { registerUser, loginUser } from './authFunctions';
import { addUserDataToFirestore } from './firebaseFunctions'; // Importa la función para agregar datos a Firestore

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const result = await registerUser(email, password);
    if (result.success && result.user && result.uid) {
      const uid = result.uid; // Obtener el uid del usuario registrado
      console.log(uid);
      const nombre = "paquito"; // Nombre del usuario
      await addUserDataToFirestore(uid, email, nombre); // Agrega el UID, correo y nombre a Firestore
      navigation.navigate('Home');
    } else {
      setMessage(result.error || 'Error desconocido al registrar el usuario.');
      console.log(result.error);
    }
  };

  const handleLogin = async () => {
    const result = await loginUser(email, password);
    if (result.success) {
      onLoginSuccess();
      navigation.navigate('Home');
    } else {
      setMessage(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});
