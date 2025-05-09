import React, { useState, useEffect, useCallback} from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Keyboard, ScrollView, NativeModules, NativeEventEmitter, Platform,  Image} from "react-native";
import { useSharedValue } from "react-native-worklets-core";
import { useNavigation } from "@react-navigation/native";
import { Icon } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from "@react-navigation/native";

import { 
    Camera, 
    useCameraDevice, 
    useCameraPermission,
    useSkiaFrameProcessor,
    VisionCameraProxy,
} from "react-native-vision-camera";
import * as Speech from 'expo-speech';


import {Skia, PaintStyle} from '@shopify/react-native-skia';
// import { runOnJS } from "react-native-reanimated";

const { HandLandmarks } = NativeModules;
const handLandmarksEmitter = new NativeEventEmitter(HandLandmarks);

// Initialize the frame processor plugin 'handLandmarks'
const handLandMarkPlugin = VisionCameraProxy.initFrameProcessorPlugin('handLandmarks',{});
console.log("Plugin handLandmarks inicializado: ", handLandMarkPlugin);


const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [9, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [13, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    [0, 17],
];

const icons = [
    {
        source: require('../assets/Icons/icon_home.png')
    },
    {
        source: require('../assets/Icons/icon_translate_spn_lsc.png')
    },
    {
        source: require('../assets/Icons/icon_dictionary.png')
    }
]

// Create a worklet function 'handLandmarks' that will call the plugin function
function handLandmarks(frame) {
    'worklet';
    if (handLandMarkPlugin == null) {
        throw new Error('Failed to load Frame Processor Plugin!');
    }
    return handLandMarkPlugin.call(frame);
}

function transformLandmarks(landmarks){
    'worklet';
    // if (!landmarks || landmarks.length === 0) {
    //   return [];
    // }

    const firstHand = landmarks[0];

    // if (!firstHand){
    //     return [];
    // }

    const formattedLandmarks = Object.values(firstHand).map(point => [ Math.trunc(point.y * 640), Math.trunc(point.x * 480)]);
    return JSON.stringify({"landmarks": formattedLandmarks});
};

const TranslatorLSCEsp = () => {

    const thingToSay = "Aquí aparecerá la interpretación de las señas"
    const [isplay, setIsplay] = useState(false);

    const speak = () => {
        if (!isplay) {
            Speech.speak(thingToSay, {
                language: 'es-CO',  
                pitch: 1,      
                rate: 0.9,
                onDone: () => setIsplay(false), 
                onStopped: () => setIsplay(false)
            });
            setIsplay(true);
        }else{
            Speech.stop();
            setIsplay(false);
        }
    };

    const paint = Skia.Paint();
    paint.setStyle(PaintStyle.Fill);
    paint.setColor(Skia.Color('blue'));

    const linePaint = Skia.Paint();
    linePaint.setStyle(PaintStyle.Fill);
    linePaint.setStrokeWidth(4);
    linePaint.setColor(Skia.Color('lime'));

    const landmarks = useSharedValue({});

    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [words, setWords] = useState([]);

    const device = useCameraDevice('back');
    const { hasPermission, setHasPermission} = useCameraPermission(false);

    useEffect(() => {
        HandLandmarks.initModel();

        // Set up the event listener to listen for hand landmarks detection results
        const subscription = handLandmarksEmitter.addListener(
            'onHandLandmarksDetected',
            (event) => {
            // Update the landmarks shared value to paint them on the screen
            landmarks.value = JSON.parse(JSON.stringify(event.landmarks));
            },
        );
    
        // Clean up the event listener when the component is unmounted
        return () => {
            subscription.remove();
        };
    }, []);
    

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardOpen(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardOpen(false));
        
        Camera.requestCameraPermission().then((permission) => {
            setHasPermission(permission === 'granted');
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval( async () => {
            if (landmarks.value && Object.keys(landmarks.value).length > 0){

                const payload = transformLandmarks(landmarks.value);
                console.log("📤 Enviando a la API:", payload); // Revisa qué estás enviando
                try{
                    const response = await fetch("https://api-hablemos.onrender.com/api/predict/", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: transformLandmarks(landmarks.value),
                    });

                    const data = await response.json();
                    console.log('Respuesta de la API:', data);

                    if (data.prediction !== ""){
                        setWords(prevWords => {
                            const newWords = [...prevWords, data.prediction];
                            return newWords.slice(-3).reverse();
                        });
                    }
                } catch (error){
                    console.error("Error en la API:", error);
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Color de la barra de navegacion
    useFocusEffect(
        useCallback(() => {
            NavigationBar.setBackgroundColorAsync("#e6f9da"); // Cambia el color al enfocar la pantalla
        }, [])
    );

    const getBubbleStyle = (index) => {
        const baseOpacity =  1- (0.2*index);
        return{
            ...styles.bubble,
            opacity: baseOpacity < 1 ? baseOpacity : 1
        }
    }

    const frameProcessor = useSkiaFrameProcessor(frame => {
        'worklet';
        frame.render();

        // Process the frame using the 'handLandmarks' function
        handLandmarks(frame);
    
        /* 
            Paint landmarks on the screen.
            Note: This paints landmarks from the previous frame since
            frame processing is not synchronous.
        */

        if (landmarks.value && landmarks.value.length > 0 && Array.isArray(landmarks.value[0])) {
            const hands = landmarks.value; // Array de manos detectadas
            
            // Recorre cada mano
            hands.forEach(hand => {
                const frameWidth = frame.width;
                const frameHeight = frame.height;
                
                // Dibuja las líneas de conexión
                for (const [from, to] of lines) {
                    frame.drawLine(
                        hand[from].x * Number(frameWidth),
                        hand[from].y * Number(frameHeight),
                        hand[to].x * Number(frameWidth),
                        hand[to].y * Number(frameHeight),
                        linePaint
                    );
                }
        
                // Dibuja los puntos
                hand.forEach(mark => {
                    frame.drawCircle(
                        mark.x * Number(frameWidth),
                        mark.y * Number(frameHeight),
                        6,
                        paint
                    );
                });
            });
        }
    }, []);
    

    const pixelFormat = Platform.OS === 'ios' ? 'rgb' : 'yuv';
    const background = require("../assets/Backgrounds/bg_verde.png");

    return (
        <>  
            <StatusBar style="dark" backgroundColor='#e6f9da' />
            <View style={styles.container}>
                <Image source={background} style={styles.background}/>
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
                                frameProcessor={frameProcessor}
                                pixelFormat={pixelFormat}
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
                        onChangeText={thingToSay}
                        editable={false}
                        placeholder="Aquí aparecerá la interpretación de las señas..."
                        placeholderTextColor="#350066"
                        multiline={true} // Permite múltiples líneas
                        numberOfLines={4} // Define una altura inicial (opcional)
                        textAlignVertical="top" // Alinea el texto en la parte superior
                        
                    />
                    <TouchableOpacity style={styles.button} onPress={speak}>
                    {!isplay ? (
                        <Icon 
                            style={styles.icon}
                            name= 'volume-2'
                            type='feather'
                            color="#fff"
                        />
                    ):(
                        <Icon 
                            style={styles.icon}
                            name= 'pause'
                            type='foundation'
                            color="#fff"
                        /> 
                    )}
                    </TouchableOpacity>
                </View>
                
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.sideButtons}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Image source={icons[0].source} style={styles.image}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.centerButton}
                        onPress={() => navigation.navigate('TranslatorEspLSC')}
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
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        backgroundColor: '#e6f9da',
        alignItems: 'center',
        justifyContent: 'center'
    },

    lscContainer: {
        width: '100%',
        height: 450,
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 25,
        paddingRight: 25,
    },

    interpretationContainer: {
        width: '100%',
        alignItems: 'center',
        height: '35%',
        paddingLeft: 25,
        paddingRight: 25,
    },

    lscVideoContainer: {
        width: '100%',
        height: 400,
        alignItems: 'center',
        position: 'relative',
        borderWidth: 4,
        borderColor: '#350066',
        borderRadius: 20,
        overflow: 'hidden'
    },

    lscVideo: {
        width: '100%',
        height: 392, 
    },

    button: {
        position: 'absolute',
        alignContent: 'center',
        bottom: 120,
        right: 35,
        backgroundColor: "#350066", 
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

    image: {
        position: 'relative',
        margin: 0,
        padding:0,
        width: 35,
        height: 35,
    },

    imageCenter: {
        position: 'relative',
        margin: 0,
        padding:0,
        width: 55,
        height: 55,
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
        backgroundColor: '#d6cffb',
        alignItems: 'center',
        justifyContent: 'center'
    },

    centerButton: {
        width: 70,
        height: 70,
        borderRadius: 5,
        borderWidth: 4,
        borderRadius:35,
        borderColor: '#350066',
        backgroundColor: '#8d77ed',
        alignItems: 'center',
        justifyContent: 'center'
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
    background: {
        width: '100%',
        height: 400,
        position: "absolute",
        bottom: 230
    }
})

export default TranslatorLSCEsp;