import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Image } from "expo-image"; // Para soportar los gifs manitos
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import {
    ExpoSpeechRecognitionModule,
    useSpeechRecognitionEvent,
} from "expo-speech-recognition";

const defaultImage = require("../assets/images/imageTest.png");

const icons = [
    {
        source: require('../assets/Icons/icon_home.png')
    },
    {
        source: require('../assets/Icons/icon_translate_lsc_spn.png')
    },
    {
        source: require('../assets/Icons/icon_dictionary.png')
    }
]

const TranslatorEspLSC = () => {
    
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => setRecognizing(false));
    useSpeechRecognitionEvent("result", (event) => {
        const newTranscript = event.results[0]?.transcript;
        setTranscript(newTranscript);
        setText(newTranscript);
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

    const [imageSource, setImageSource] = useState(defaultImage);
    const [isPlaying, setIsPlaying] = useState(false);

    const getGifPath = (word) => {
        try {
            if (text.toLowerCase() == "hola"){ 
                return require('../assets/Gif/Hola.gif');
            }else if (text.toLowerCase() == "gracias"){
                return require('../assets/Gif/Gracias.gif');
            }
        } catch (error) {
            return null;
        }
    };

    const loadGif = () => { 

        if (isPlaying) {
            setImageSource(defaultImage); 
        } else {
            if (text.trim() === "") {
                Alert.alert("Aviso", "Por favor, ingresa un texto antes de continuar.");
                return;
            }
            const gifPath = getGifPath(text);
            if (gifPath) {
                setImageSource(gifPath); // Cambia la imagen por el gif
            } else {
                Alert.alert("Error", `No se encontró el GIF para la palabra: ${text}`);
                setImageSource(defaultImage); // Si el GIF no existe, vuelve a la imagen inicial
            }
    }
    setIsPlaying(!isPlaying);
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
                        source={imageSource} 
                        contentFit="cover"
                    />
                    
                    <TouchableOpacity style={styles.playButton} onPress={loadGif}>
                    {!isPlaying ? (
                        <Icon 
                            name="controller-play"
                            type="entypo" 
                            color="#fff" 
                            size={30} />
                    ):(
                        <Icon 
                            name="pause"
                            type="fontAwesome6" 
                            color="#fff" 
                            size={30} />  
                    )}

                    </TouchableOpacity>
                </View>
            

            <View style = {styles.textContainer}>
                <Text style={styles.subtitle}>Texto - Audio</Text>
                <View style={styles.inputWrapper}>
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
                <TouchableOpacity style={styles.micButton} onPress={!recognizing ? handleStart : () => ExpoSpeechRecognitionModule.stop()}>
                {!recognizing ? (
                    <Icon 
                        style={styles.icon}
                        name= 'microphone'
                        type='font-awesome'
                        color="#fff"
                    />  
                
                ) : ( 
                    <Icon
                        style={styles.icon}
                        name= 'microphone-slash'
                        type='font-awesome'
                        color="#fff"
                    />
                
                    )}
                </TouchableOpacity>
                </View>
            </View>

{/*                 
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>Texto - Audio</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textarea}
                            value={text}
                            onChangeText={setText}
                            placeholder="Escribe aquí..."
                            placeholderTextColor="#350066"
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                        <TouchableOpacity style={styles.micButton}>
                            <Icon name="microphone" type="foundation" color="#fff" size={24} />
                        </TouchableOpacity>
                    </View>
                </View> */}

                
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.sideButtons}
                        onPress={() => navigation.navigate('Home')}
                    >s
                        <Image source={icons[0].source} style={styles.image}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.centerButton}
                        onPress={() => navigation.navigate('TranslatorLSCEsp')}
                    >
                        <Image source={icons[1].source} style={styles.imageCenter}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sideButtons}
                        onPress={() => navigation.navigate('Dictionary')}
                    >
                        <Image source={icons[2].source} style={styles.image}></Image>
                    </TouchableOpacity>
                </View>
            
        </ScrollView> 
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingVertical: 20, 
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#d7e6fa" 
    },
    scrollView: { 
        flexGrow: 1, 
        paddingHorizontal: 20 ,
    },
    lscContainer: { 
        width: "100%", 
        height: 400, 
        alignItems: "center", 
        position: "relative" 
    },
    lscVideo: { 
        width: "90%", 
        height: 392, 
        borderRadius: 20, 
        borderWidth: 2, 
        borderColor: "#350066" 
    },
    playButton: { 
        position: "absolute", 
        bottom: 35, 
        left: 25, 
        backgroundColor: "#350066", 
        padding: 12, 
        borderRadius: 30, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    subtitle: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginVertical: 20, 
        textAlign: "center", 
        color: "#350066" 
    },
    inputWrapper: { 
        width: "100%", 
        flexDirection: "row", 
        alignItems: "center", 
        borderWidth: 2, 
        borderRadius: 10, 
        borderColor: "#350066", 
        backgroundColor: "#f9f9f9", 
        paddingHorizontal: 10, 
        paddingVertical: 5 
    },
    textarea: { 
        flex: 1, 
        fontSize: 16, 
        height: 130,
        color: "#350066", 
        paddingVertical: 10 
    },
    micButton: { 
        backgroundColor: "#350066", 
        borderRadius: 20, 
        padding: 10, 
        bottom: 10,
        right: 10,
        position: 'absolute'
    },
    buttonsContainer: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly', 
        bottom: 10,
        marginLeft: 20
    },
    centerButton: { 
        width: 70, 
        height: 70, 
        borderRadius: 35, 
        borderWidth: 4, 
        borderColor: "#350066", 
        backgroundColor: "#8d77ed" 
    },
    bottomButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sideButtons: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#350066',
        backgroundColor: '#d7e6fa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        position: 'relative',
        margin: 0,
        padding:0,
        width: 35,
        height: 35,
    },

    imageCenter: {
        position: 'relative',
        marginLeft: 2,
        marginTop: 2,
        width: 55,
        height: 55,
    },
    
});

export default TranslatorEspLSC;