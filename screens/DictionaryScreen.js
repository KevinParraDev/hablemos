import React from "react";
import { StyleSheet, View, Text, TextInput, FlatList,TouchableOpacity, Image, ScrollView} from "react-native";
import Constants from "expo-constants";
import { Icon } from '@rneui/themed';
import VideoCard  from './elements/CardVideo.js';
import { useNavigation } from "@react-navigation/native";

const Dictionary = () => {

    const navigation = useNavigation();

    const cards = [
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
        {
            source: require('../assets/images/imageTest.png'),
            word: 'Palabra'
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList 
                    data={cards}
                    renderItem={({item}) => <VideoCard video={item.source} word={item.word} />}
                    numColumns={2}
                    columnWrapperStyle={styles.viewCard}
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.title}> Diccionario </Text>
                            <TextInput 
                                placeholder='Buscar'
                                inputMode= 'search'
                                placeholderTextColor='#350066'
                                onPressIn={() => {}}
                                style={styles.searchBar}
                            />
                            <Icon 
                                name= 'search'
                                type='font-awesome'
                                color= '#350066'
                                containerStyle={styles.iconSearch}
                            />
                        </View>
                    }
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.sideButtons}
                    onPress={() => navigation.navigate('TranslatorLSCEsp')}
                >
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.centerButton}
                    onPress={() => navigation.navigate('Home')}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sideButtons}
                    onPress={() => navigation.navigate('TranslatorEspLSC')}
                >
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffdbde',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:30,
        marginBottom:30
    },
    searchBar:{
        marginStart: 30,
        marginEnd: 30,
        borderColor: '#350066',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: '#350066',
    },
    iconSearch: {
        position: 'absolute',
        top: 100,
        right: 40
    },
    viewCard: {
        marginTop: 40,
        marginBottom: 10,
        justifyContent: 'space-around',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'transparent'
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
    }
});

export default Dictionary;