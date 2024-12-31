import React, { useRef, useState } from 'react';
// import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabCameraScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [msg, setMsg] = useState<string | null>(null);

  // useEffect(() =>{
  //   async function getSize() {
  //     if (permission?.granted && cameraRef.current) {
  //       const sizes = await cameraRef.current.getAvailablePictureSizesAsync();
  //     }
  //   }
  //   getSize();
  // })

  if (!permission) {
    // Camera permissions are still loading.
    <View />
  }

  if (!permission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView>      
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title='grant permission' />
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return <View style={styles.container}>
      <View style={styles.flexContainer}>
        {/* <CameraView style={styles.flexContainer} ref={cameraRef} /> */}
        <CameraView style={styles.flexContainer} facing={facing} ref={cameraRef} />
      </View>

      <View style={styles.flexContainer}>
        <Button title='Take picture' onPress={async () => {
          const photo = await cameraRef.current?.takePictureAsync();
          setMsg(`Zdjęcie zrobione w wymiarach: ${photo?.width}x${photo?.height}`)
        }} />
        <Text style={styles.text}>{msg}</Text>
      </View>

        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 40,
    },
    flexContainer: {
      flex: 1,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    button: {
      flex: 1,
      // alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'blue',
    },
});
