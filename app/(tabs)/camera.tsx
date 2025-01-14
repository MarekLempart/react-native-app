import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabCameraScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [msg, setMsg] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    <View />
  }

  if (!permission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button title="Grant Permission" onPress={requestPermission}  />
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Take Picture"
          onPress={async () => {
            const photo = await cameraRef.current?.takePictureAsync();
            setMsg(`Zdjęcie zrobione w wymiarach: ${photo?.width}x${photo?.height}`);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        {msg && <Text style={styles.msgText}>{msg}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    cameraContainer: {
      flex: 3, // Camera occupies 3/4 of the screen
    },
    camera: {
      flex: 1,
      borderRadius: 10,
      overflow: 'hidden',
    },
    buttonsContainer: {
      flex: 1, // Buttons occupy 1/4 of the screen
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 40,
      backgroundColor: '#fff',
    },
    button: {
      padding: 10,
      backgroundColor: '#007bff',
      borderRadius: 5,
      marginTop: 10,
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 16,
      color: '#333',
    },
    msgText: {
      fontSize: 14,
      color: '#555',
      marginTop: 10,
    },
});
