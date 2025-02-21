import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants"
import { Icon } from '@rneui/themed';
import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
  } from "expo-speech-recognition";


const lscVideo = require('../assets/images/imageTest.png')

const TranslatorEspLSC = () => {

    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => setRecognizing(false));
    useSpeechRecognitionEvent("result", (event) => {
      setTranscript(event.results[0]?.transcript);
    });
    useSpeechRecognitionEvent("error", (event) => {
      console.log("error code:", event.error, "error message:", event.message);
    });

    const handleStart = async () => {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
          console.warn("Permissions not granted", result);
          return;
        }
        // Start speech recognition
        ExpoSpeechRecognitionModule.start({
          lang: "es-CO",
          interimResults: true, //Escritura al tiempo o despues de hablar
          maxAlternatives: 1,
          continuous: false, // Control para que se detenga automaticamente el reconocimiento, true:para detenerlo automaticamente
          requiresOnDeviceRecognition: false, //Reconocimiento usando servicios en la nube, true:reconocimiento local, con el dispositivo
          addsPunctuation: true,
        //   contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"], //palabras claves a priorizar o reconocer
        });
      };

      const showAlert = () => {
        if (text.trim() === "") {
            Alert.alert("Aviso", "Por favor, ingresa un texto antes de continuar.");
        } else {
            Alert.alert("Texto ingresado", text);
        }
    };

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
            <View style={styles.lscContainer}>
                <Image 
                    style={styles.lscVideo}
                    source={lscVideo}
                />
                <TouchableOpacity style={styles.button}>
                    <Icon
                        style={styles.icon}
                        name= 'controller-play'
                        type='entypo'
                        color= '#350066'
                    />
                </TouchableOpacity>
            </View>
            

            <View style = {styles.textContainer}>
                <Text style={styles.subtitle}>Texto - Audio</Text>
                <TextInput
                    style={styles.textarea}
                    value={text || transcript}
                    onChangeText={setText}
                    placeholder="Escribe aquí..."
                    placeholderTextColor="#350066"
                    multiline={true} // Permite múltiples líneas
                    numberOfLines={4} // Define una altura inicial (opcional)
                    textAlignVertical="top" // Alinea el texto en la parte superior
                />
                <TouchableOpacity style={styles.button} onPress={!recognizing ? handleStart : () => ExpoSpeechRecognitionModule.stop()}>
                {!recognizing ? (
                    <Icon 
                        style={styles.icon}
                        name= 'microphone'
                        type='foundation'
                        color= '#350066'
                    />  
                   
                ) : ( 
                    <Icon

                        style={styles.icon}
                        name= 'microphone-slash'
                        type='font-awesome'
                        color= '#350066'
                    />
                   
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.bottomButtons}>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.otherButton}
                        onPress={() => navigation.navigate("Home")}
                    >
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.centerButton}
                        onPress={() => showAlert()}
                    >
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.otherButton}
                        onPress={() => navigation.navigate("Dictionary")}
                    >
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> 
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#d7e6fa',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    lscContainer: {
        marginTop: 10,
        width: '100%',
        height: 500,
        alignItems: 'center',
        position: 'relative'
    },
    lscVideo: {
        width: '100%',
        height: 500,
        borderWidth: 4,
        borderRadius:30,
        borderColor: '#350066'
    },
    button: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#ffffff',
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
        marginVertical: 20,
        textAlign: 'center'
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
    },
    otherButton: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderWidth: 4,
        borderRadius:35,
        borderColor: '#350066',
        backgroundColor: '#8d77ed'
    },
    bottomButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    textContainer: {
        width: '100%',
        alignItems: 'center',
    },
})

export default TranslatorEspLSC;