import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [input1, setInput1] = useState('');  // Estado para el primer TextInput
  const [input2, setInput2] = useState('');  // Estado para el segundo TextInput
  const [counter, setCounter] = useState(0);  // Estado para el contador
  const [selectedImage, setSelectedImage] = useState(null);  // Estado para la imagen seleccionada

  // Función para manejar el botón de presionar e incrementar el contador
  const handlePress = async () => {
    setCounter(counter + 1);  // Incrementar el contador

    // Solicitar permiso para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("¡Necesitas permitir el acceso a la galería!");
      return;
    }

    // Abre la galería para seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Guardar la URI de la imagen seleccionada
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>

      {/* Mostrar la imagen seleccionada o la imagen predeterminada */}
      <Image 
        source={selectedImage ? { uri: selectedImage } : require('./assets/img1222.jpg')} 
        style={styles.image} 
      />

      {/* Primer TextInput */}
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese algo aquí..."
        value={input1}
        onChangeText={(text) => setInput1(text)}
      />

      {/* Segundo TextInput */}
      <TextInput
        style={styles.textInput}
        placeholder="Ingrese más texto..."
        value={input2}
        onChangeText={(text) => setInput2(text)}
      />

      {/* Mostrar el contador */}
      <Text style={styles.counterText}>Contador: {counter}</Text>

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Presionarme</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fd8fff',
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
  image: {
    height: 600,
    width: 600,
    borderRadius: 90,
    borderWidth: 30,
    borderColor: '#ffff',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 35,
    paddingHorizontal: 10,
    color: '#fff',
  },
  counterText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 7,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

