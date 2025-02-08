import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants"
import { Icon } from '@rneui/themed';

const lscVideo = require('../assets/images/imageTest.png')

const TranslatorEspLSC = () => {

    const navigation = useNavigation();
    const [text, setText] = useState('');

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
<<<<<<< Updated upstream
            

            <View style = {styles.textContainer}>
                <Text style={styles.subtitle}>Texto - Audio</Text>
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
                <TouchableOpacity style={styles.button}>
                    <Icon 
                        style={styles.icon}
                        name= 'microphone'
                        type='foundation'
                        color= '#350066'
                    />
                </TouchableOpacity>
            </View>

=======
            <Text style={styles.subtitle}>Texto - Audio</Text>
            <TextInput
                style={styles.textarea}
                value={text}
                onChangeText={setText}
                placeholder="Escribe aquí123..."
                placeholderTextColor="#350066"
                multiline={true} // Permite múltiples líneas
                numberOfLines={4} // Define una altura inicial (opcional)
                textAlignVertical="top" // Alinea el texto en la parte superior
            />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        onPress={() => navigation.navigate("TranslatorLSCEsp")}
=======
                        onPress={showAlert}
>>>>>>> Stashed changes
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