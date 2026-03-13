import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = "https://repositorio123-production.up.railway.app";

  const obtenerUsuarios = () => {
    fetch(`${API_URL}/user/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setUsuarios(data))
      .catch(err => {
        console.error("Error al obtener usuarios:", err);
        alert("No se pudieron cargar los usuarios.");
      });
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const crearUsuario = () => {
    if (!name || !email || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    fetch(`${API_URL}/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        alert("Usuario creado correctamente.");
        obtenerUsuarios();
      })
      .catch(err => {
        console.error("Error al crear usuario:", err);
        alert("No se pudo crear el usuario.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Usuarios</Text>
        {usuarios.length === 0 ? (
          <Text>No hay usuarios registrados.</Text>
        ) : (
          usuarios.map((usuario, index) => (
            <Text key={index} style={styles.userItem}>
              {usuario.name} - {usuario.email}
            </Text>
          ))
        )}

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
        <View style={styles.buttonWrapper}>
          <Button title="Crear" onPress={crearUsuario} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40 },
  container: { maxWidth: 600, marginHorizontal: 'auto', padding: 20, backgroundColor: '#f9f9f9', borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  input: { width: '100%', borderWidth: 1, padding: 10, marginVertical: 8, borderRadius: 5, boxSizing: 'border-box' },
  userItem: { paddingVertical: 4, fontSize: 16 },
  buttonWrapper: { marginTop: 10 }
});