import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, Keyboard} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants"
import { Icon } from '@rneui/themed';
import { ScrollView } from "react-native-web";

//import { Camera, useCameraDevice, useCameraPermission } from "react-native-vision-camera";
// en dependencies en el package.json "react-native-vision-camera": "^4.6.3"

const lscVideo = require('../assets/images/imageTest.png')

const TranslatorLSCEsp = () => {

    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [words, setWords] = useState([]);

    //const device = useCameraDevice('back');
    //const { hasPermission, setHasPermission} = useCameraPermission(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardOpen(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardOpen(false));
        
        //Camera.requestCameraPermission().then((permission) => {
        //    setHasPermission(permission === 'granted');
        //});

        const interval = setInterval(() => {
            let signs = ['Hola', 'Amigo', '¿Cómo estás?', 'Bien']
            let randomWord = signs[Math.floor(Math.random() * signs.length)];
            setWords(prevWords => {
                const newWords = [...prevWords, randomWord];
                return newWords.slice(-4).reverse();
            })}, 2000);

        return () => {
        showSubscription.remove();
        hideSubscription.remove();
        };
    }, []);

    const getBubbleStyle = (index) => {
        const baseOpacity =  1- (0.2*index);
        return{
            ...styles.bubble,
            opacity: baseOpacity < 1 ? baseOpacity : 1
        }
    }

    return (
        <View style={styles.container}>
            {!isKeyboardOpen && (
                <View style={styles.lscContainer}>
                {/*<View style={styles.lscContainer}>
                    {/*
                    {!hasPermission && <Text style={styles.subtitle}>No hay permiso de la cámara</Text>}
                    {hasPermission && device != null && (
                        <Camera
                        style={styles.lscVideo}
                        device={device}
                        isActive={true}
                        />
                    )}
                    <TouchableOpacity style={styles.button}>
                    </TouchableOpacity>
                </View>*/}
                    <ScrollView horizontal={true} style={styles.scrollView}>
                        {words.map((word, index) => (
                            <View key={index} style={getBubbleStyle(index)}>
                                <Text style={styles.textBubble}>{word}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <Image 
                        style={styles.lscVideo}
                        source={lscVideo}
                    />
                </View>
            )}

            <View style = {styles.interpretationContainer}>
                <Text style={styles.subtitle}>Interpretación</Text>
                <TextInput
                    style={styles.textarea}
                    value={text}
                    onChangeText={setText}
                    placeholder="Aquí aparecerá la interpretación de las señas..."
                    placeholderTextColor="#350066"
                    multiline={true} // Permite múltiples líneas
                    numberOfLines={4} // Define una altura inicial (opcional)
                    textAlignVertical="top" // Alinea el texto en la parte superior
                    
                />
                <TouchableOpacity style={styles.button}>
                    <Icon 
                        style={styles.icon}
                        name= 'volume-2'
                        type='feather'
                        color= '#350066'
                    />
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
                        onPress={() => navigation.navigate("TranslatorEspLSC")}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#d7e6fa',
        alignItems: 'center',
        justifyContent: 'center'
    },

    lscContainer: {
        marginTop: 10,
        width: '100%',
        height: 500,
        alignItems: 'center',
        position: 'relative'
    },

    interpretationContainer: {
        width: '100%',
        alignItems: 'center',
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

    scrollView: {
        position : 'absolute',
        bottom: 15,
        left: 15,
        flexDirection: 'row',
        zIndex: 1000,
    },

    bubble: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5,
    },

    textBubble: {
        color: '#000',
    },
})

export default TranslatorLSCEsp;