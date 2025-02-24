import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import  {db}  from "../src/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useCopilot, CopilotStep, walkthroughable } from 'react-native-copilot';

// Definimos los componentes que van a ser resaltados en el tutorial
const WalkthroughableTouchable = walkthroughable(TouchableOpacity);

const addUser = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: "David Ramírez",
            age: 24,
            email: "david@unal.edu.co",
        });
        console.log("Usuario agregado con ID:", docRef.id);
    } catch (error) {
        console.error("Error agregando usuario:", error);
    }
};

// Llama a la función para probar
addUser();

const homeVideo = require('../assets/Gif/Hola.gif')

const HomeScreen = () => {

    const navigation = useNavigation();
    const { start } = useCopilot();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hablemos
            </Text>
            <Image source={homeVideo} style={styles.homeVideo}/>
            <Text style={styles.saludo}>¡Hola!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => start()}
                    style={StyleSheet.compose(styles.button, {backgroundColor: '#cdf9f6'})}
                >
                    <Text style={styles.buttonText}>
                        Tutorial
                    </Text>
                </TouchableOpacity>
                <CopilotStep name='LSC-ESP' order={1} text='Aquí podrás realizar la traducción de señas a español.'>
                    <WalkthroughableTouchable 
                        onPress={() => navigation.navigate("TranslatorLSCEsp")}
                        style={StyleSheet.compose(styles.button, {backgroundColor: '#e6f9da'})}
                    >
                        <Text style={styles.buttonText}>
                            LSC - ESP
                        </Text>
                    </WalkthroughableTouchable>
                </CopilotStep>

                <CopilotStep name='ESP-LSC' order={2} text='Aquí podrás realizar la traducción de español a señas.'>
                    <WalkthroughableTouchable
                        onPress={() => navigation.navigate("TranslatorEspLSC")}
                        style={StyleSheet.compose(styles.button, {backgroundColor: '#d7e6fa'})}
                    >
                        <Text style={styles.buttonText}>
                            ESP - LSC
                        </Text>
                    </WalkthroughableTouchable>
                </CopilotStep>

                <CopilotStep name='Diccionario' order={3} text='Aquí encontrarás distintas palabras y su seña correspondiente.'>
                    <WalkthroughableTouchable
                        onPress={() => navigation.navigate("Dictionary")}
                        style={StyleSheet.compose(styles.button, {backgroundColor: '#ffdbde'})}
                    >
                        <Text style={styles.buttonText}>
                            Diccionario
                        </Text>
                    </WalkthroughableTouchable>
                </CopilotStep>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#cdf9f6',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#350066',
        marginTop:30,
        marginBottom:30
    },
    homeVideo: {
        width: 250,
        height: 250,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#350066'
    },
    saludo: {
        marginTop: 20,
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flex:1,
        marginTop: 10,
        justifyContent: 'center'
    },
    button: {
        width: 200,
        backgroundColor: '#cdf9f6',
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#350066'
    },
    buttonText: {
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default HomeScreen;