import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, Keyboard} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants"
//import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
// en dependencies en el package.json "react-native-vision-camera": "^4.6.3"

const lscVideo = require('../assets/images/imageTest.png')

const TranslatorLSCEsp = () => {

    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    //const device = useCameraDevice('back');
    //const { hasPermission, setHasPermission} = useCameraPermission(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardOpen(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardOpen(false));
        
        //Camera.requestCameraPermission().then((permission) => {
        //    setHasPermission(permission === 'granted');
        //});

        return () => {
        showSubscription.remove();
        hideSubscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            {!isKeyboardOpen && (
                <View style={styles.lscContainer}>
                    {/*
                    {!hasPermission && <Text style={styles.subtitle}>No hay permiso de la cámara</Text>}
                    {hasPermission && device != null && (
                        <Camera
                        style={styles.lscVideo}
                        device={device}
                        isActive={true}
                        />
                    )}
                    */}
                    <TouchableOpacity style={styles.button}>
                    </TouchableOpacity>
                </View>
            )}
            <Text style={styles.subtitle}>Interpretación</Text>
            <TextInput
                style={styles.textarea}
                value={text}
                onChangeText={setText}
                placeholder="Escribe aquí..."
                placeholderTextColor="#350066"
                multiline={true} // Permite múltiples líneas
                numberOfLines={4} // Define una altura inicial (opcional)
                textAlignVertical="top" // Alinea el texto en la parte superior
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.centerButton}
                    onPress={() => navigation.navigate("Home")}
                >
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#d7e6fa',
        alignItems: 'center'
    },
    lscContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        marginHorizontal:40,
        position: 'relative'
    },
    lscVideo: {
        width: '100%',
        height: 400,
        borderWidth: 4,
        borderRadius:30,
        borderColor: '#350066'
    },
    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#ffffff', // Fondo semitransparente
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: 50,
        height: 50,
        borderRadius: 5,
        borderWidth: 3,
        borderRadius:25,
        borderColor: '#350066'
      },
    subtitle: {
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    textarea: {
        width: '100%',
        height: 150, // Ajusta la altura según lo que necesites
        borderColor: '#350066',
        borderWidth: 4,
        borderRadius: 20,
        padding: 10,
        fontSize: 16,
        color: '#350066',
        fontWeight: '500',
        backgroundColor: '#f9f9f9',
      },
      buttonsContainer: {
        alignItems: 'center',
        margin: 20
    },
    centerButton: {
        width: 70,
        height: 70,
        borderRadius: 5,
        borderWidth: 4,
        borderRadius:35,
        borderColor: '#350066',
        backgroundColor: '#8d77ed'
    }
})

export default TranslatorLSCEsp;