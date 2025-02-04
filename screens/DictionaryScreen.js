import React from "react";
import { StyleSheet, View, Text, TextInput, FlatList,TouchableOpacity, Image, ScrollView} from "react-native";
import Constants from "expo-constants";
import { Icon } from '@rneui/themed';
import VideoCard  from './elements/CardVideo.js';
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";

const Dictionary = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

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

    const openModal = (card) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <FlatList 
                    data={cards}
                    renderItem={ ({item}) => (    
                        <VideoCard 
                            video={item.source} 
                            word={item.word} 
                            onPress={() => openModal(item)}/>
                    )}
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
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedCard && (
                            <>
                                <Image source={selectedCard.source} style={styles.modalImage} />
                                <Text style={styles.modalText}>{selectedCard.word}</Text>
                            </>
                        )}

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Icon 
                                    name= 'arrow-left'
                                    type='font-awesome'
                                    color= '#350066'
                                    containerStyle={styles.modalIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.favoriteButton}>
                                <Icon 
                                    name= 'star'
                                    type='font-awesome'
                                    color= '#350066'
                                    containerStyle={styles.favoriteIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton}>
                                <Icon 
                                    name= 'share-alt'
                                    type='font-awesome'
                                    color= '#350066'
                                    containerStyle={styles.modalIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        
                    </View>
                </View>
            </Modal>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#350066',
        // alignItems: 'center'
    },
    modalImage: {
        width: 170,
        height: 150,
        borderRadius: 20,
        borderColor: '#350066',
        borderWidth: 3
    },
    modalText: {
        color: '#350066',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },

    modalIcon: {
        position: 'absolute',
        top: 7,
        left: 7
    },
    favoriteIcon: {
        position: 'absolute',
        top: 8,
        right: 8
    },
    modalButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#808aff',
        alignContent: 'center',
        marginTop: 10
    },

    favoriteButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#ff809f',
        alignContent: 'center',
        marginTop: 10
    }
});

export default Dictionary;