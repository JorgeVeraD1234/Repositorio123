import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Cambia esta URL por la de tu backend Flask vewgvk
  const API_URL = "http://127.0.0.1:https://repositorio123-production.up.railway.app";

  // Obtener usuarios al cargar la app
useEffect(() => {
  fetch(`${API_URL}/user/get-all`)
    .then(res => res.json())
    .then(data => setUsuarios(data))
    .catch(err => console.error("Error al obtener usuarios:", err));
}, []);

// Crear usuario
const crearUsuario = () => {
  fetch(`${API_URL}/user/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(() => {
      // Después de crear, recargar lista completa
      fetch(`${API_URL}/user/get-all`)
        .then(res => res.json())
        .then(data => setUsuarios(data));
      
      // Limpiar formulario
      setName('');
      setEmail('');
      setPassword('');
    })
    .catch(err => console.error("Error al crear usuario:", err));
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.email}</Text>
        )}
      />

      <Text style={styles.title}>Crear Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Crear" onPress={crearUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 }
});
