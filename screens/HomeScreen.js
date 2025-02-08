import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import  {db}  from "../src/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";


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

const homeVideo = require('../assets/images/imageTest.png')

const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hablemos
            </Text>
            <Image source={homeVideo} style={styles.homeVideo}/>
            <Text style={styles.saludo}>¡Hola!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TranslatorLSCEsp")}
                    style={StyleSheet.compose(styles.button, {backgroundColor: '#cdf9f6'})}
                >
                    <Text style={styles.buttonText}>
                        Tutorial
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TranslatorLSCEsp")}
                    style={StyleSheet.compose(styles.button, {backgroundColor: '#e6f9da'})}
                >
                    <Text style={styles.buttonText}>
                        LSC - ESP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TranslatorEspLSC")}
                    style={StyleSheet.compose(styles.button, {backgroundColor: '#d7e6fa'})}
                >
                    <Text style={styles.buttonText}>
                        ESP - LSC
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Dictionary")}
                    style={StyleSheet.compose(styles.button, {backgroundColor: '#ffdbde'})}
                >
                    <Text style={styles.buttonText}>
                        Diccionario
                    </Text>
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