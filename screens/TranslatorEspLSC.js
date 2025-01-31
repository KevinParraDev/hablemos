import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants"

const lscVideo = require('../assets/images/imageTest.png')

const TranslatorEspLSC = () => {

    const navigation = useNavigation();
    const [text, setText] = useState('');

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
                </TouchableOpacity>
            </View>
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
                        onPress={() => navigation.navigate("Home")}
                    >
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.otherButton}
                        onPress={() => navigation.navigate("Home")}
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
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#d7e6fa',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    lscContainer: {
        width: '100%',
        alignItems: 'center',
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
        backgroundColor: '#ffffff',
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
    }
})

export default TranslatorEspLSC;