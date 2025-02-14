import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, Keyboard, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from '@rneui/themed';
import { Camera, useCameraDevice, useCameraPermission} from "react-native-vision-camera";

const lscVideo = require('../assets/images/imageTest.png')

const TranslatorLSCEsp = () => {

    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [words, setWords] = useState([]);

    const device = useCameraDevice('back');
    const { hasPermission, setHasPermission} = useCameraPermission(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardOpen(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardOpen(false));
        
        Camera.requestCameraPermission().then((permission) => {
            setHasPermission(permission === 'granted');
        });

        const interval = setInterval(() => {
            let signs = ['Hola', 'Amigo', '¿Cómo estás?', 'Bien']
            let randomWord = signs[Math.floor(Math.random() * signs.length)];
            setWords(prevWords => {
                const newWords = [...prevWords, randomWord];
                return newWords.slice(-3).reverse();
            })}, 3000);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
            clearInterval(interval);
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
                    <ScrollView horizontal={true} style={styles.scrollView}>
                        {words.map((word, index) => (
                            <View key={index} style={getBubbleStyle(index)}>
                                <Text style={styles.textBubble}>{word}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style = {styles.lscVideoContainer}>
                        {!hasPermission && <Text style={styles.subtitle}>No hay permiso de la cámara</Text>}
                        {hasPermission && device != null && (
                            <Camera
                            style={styles.lscVideo}
                            device={device}
                            isActive={true}
                            />
                        )}
                    </View>
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
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.sideButtons}
                    onPress={() => navigation.navigate('Home')}
                >
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.centerButton}
                    onPress={() => navigation.navigate('TranslatorEspLSC')}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sideButtons}
                    onPress={() => navigation.navigate('Dictionary')}
                >
                </TouchableOpacity>
            </View>
            
        
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        paddingTop: 0,
        padding: 30,
        backgroundColor: '#d7e6fa',
        alignItems: 'center',
        justifyContent: 'center'
    },

    lscContainer: {
        width: '100%',
        height: 400,
        alignItems: 'center',
        position: 'relative'
    },

    interpretationContainer: {
        width: '100%',
        alignItems: 'center',
        padingTop: 5,
    },

    lscVideoContainer: {
        width: '100%',
        height: 400,
        alignItems: 'center',
        position: 'relative',
        borderWidth: 4,
        borderColor: '#350066'
    },

    lscVideo: {
        width: '100%',
        height: 392, 
    },

    button: {
        position: 'absolute',
        alignContent: 'center',
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

    icon: {
        position: 'relative',
        margin: 0,
        padding:0,
        width: 20,
        height: 20,
    },
      
    subtitle: {
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20
    },
    textarea: {
        width: '100%',
        height: 130,
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
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly', 
        bottom: 10
    },
    sideButtons: {
        width: 45,
        height: 45,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#350066',
        backgroundColor: '#d7e6fa'
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