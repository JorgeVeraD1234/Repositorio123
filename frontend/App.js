import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // URL de tu backend en Railway
  const API_URL = "https://repositorio123-production.up.railway.app";

  // Función para obtener todos los usuarios
  const obtenerUsuarios = () => {
    fetch(`${API_URL}/user/get-all`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setUsuarios(data))
      .catch(err => {
        console.error("Error al obtener usuarios:", err);
        Alert.alert("Error", "No se pudieron cargar los usuarios.");
      });
  };

  // Ejecutar al montar la app
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Función para crear usuario
  const crearUsuario = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
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
        // Refrescar lista
        obtenerUsuarios();

        // Limpiar formulario
        setName('');
        setEmail('');
        setPassword('');

        Alert.alert("Éxito", "Usuario creado correctamente.");
      })
      .catch(err => {
        console.error("Error al crear usuario:", err);
        Alert.alert("Error", "No se pudo crear el usuario.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      {usuarios.length === 0 ? (
        <Text>No hay usuarios registrados.</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.userItem}>{item.name} - {item.email}</Text>
          )}
        />
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
      <Button title="Crear" onPress={crearUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  userItem: { paddingVertical: 4, fontSize: 16 }
});