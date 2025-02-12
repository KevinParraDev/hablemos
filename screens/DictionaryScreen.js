import React, {useEffect, useLayoutEffect} from "react";
import { StyleSheet, View, Text, TextInput, FlatList,TouchableOpacity, Image, Modal} from "react-native";
import { Icon } from '@rneui/themed';
import {AnimatedVideoCard}  from './elements/CardVideo.js';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useContext } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
// import { Alert } from "react-native";


const cardsExample = [
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Palabra'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Hola'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Cama'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Movil'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Adios'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Carro'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Casa'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Papa'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Tomate'
    },
    {
        source: require('../assets/images/imageTest.png'),
        word: 'Computador'
    },
]

const Dictionary = () => {

    const navigation = useNavigation();
    const [cards, setCards] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const { favorites, addToFavorites } = useContext(FavoritesContext);

    const openModal = (card) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setShowSearch(scrollY > 20);
    };

    useEffect(() => {

        if(searchQuery === ''){
            setCards(cardsExample);
        }else{
            const filteredCards = cardsExample.filter((item) => 
                item.word.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
    
            setCards(filteredCards);
        }

    }, [searchQuery]);

    useEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: showSearch  ? {
                inputType: 'text',
                textColor: '#350066',
                hintTextColor: '#350066',
                headerIconColor: '#350066',
                tintColor: '#350066',
                placeholder: 'Buscar...',
                onChangeText:(event) => {
                    const text = event.nativeEvent.text;
                    setSearchQuery(text);
                },
            } : undefined
        });
    }, [navigation, showSearch]);

    useEffect(() => {
        if (selectedCard) {
            setIsFavorite(favorites.some(fav => fav.word === selectedCard.word));
        }
    }, [selectedCard, favorites]);

    const handleAddToFavorites = () => {
        if (isFavorite) {
            // Alert.alert("Ya está en favoritos", "La seña ya se encuentra en tu lista de favoritos.");
            window.alert("La seña ya se encuentra en favoritos");
            return;
        }
        addToFavorites(selectedCard);
        setIsFavorite(true);
        // Alert.alert("Añadida a favoritos", "La seña se ha guardado en tu lista de favoritos.");
        window.alert("Añadida a favoritos");

    };

    return (
        <View style={styles.container} >
            <FlatList 
                data={cards}
                onScroll={handleScroll}
                keyExtractor={(item) => item.word}
                renderItem={ ({item, index}) =>    
                    <AnimatedVideoCard 
                        video={item.source} 
                        word={item.word} 
                        onPress={() => openModal(item)}
                        index={index}
                    />
                }
                numColumns={2}
                columnWrapperStyle={styles.viewCard}
                ListHeaderComponent={
                    <>
                        <TextInput 
                            placeholder='Buscar...'
                            inputMode= 'search'
                            placeholderTextColor='#350066'
                            enterKeyHint='search'
                            maxLength={30}
                            onChangeText={(search) => setSearchQuery(search)}
                            style={styles.searchBar}
                        />
                        <Icon 
                            name= 'search'
                            type='font-awesome'
                            color= '#350066'
                            containerStyle={styles.iconSearch}
                        />
                    </>
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

                        <View style={styles.buttonsMContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Icon 
                                    name= 'arrow-left'
                                    type='font-awesome'
                                    color= '#350066'
                                    containerStyle={styles.modalIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.favoriteButton} onPress={handleAddToFavorites}>
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
    },
    searchBar:{
        height: 50,
        marginTop: 30,
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
        paddingLeft: 15,
        paddingRight: 40,
    },
    iconSearch: {
        position: 'absolute',
        marginTop: 40,
        right: 40
    },
    viewCard: {
        marginTop: 40,
        marginBottom: 10,
        justifyContent: 'space-around',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '80%',
        height: '53%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#350066',
        alignItems: 'center'
    },
    modalImage: {
        width: 250,
        height: 290,
        borderRadius: 20,
        borderColor: '#350066',
        borderWidth: 3,
        top: 10
    },
    modalText: {
        color: '#350066',
        fontSize: 24,
        padding: 15,
        top: 10,    
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    buttonsMContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    modalIcon: {
        position: 'absolute',
        top: 11,
        left: 13
    },
    favoriteIcon: {
        position: 'absolute',
        top: 11,
        right: 14
    },
    modalButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#808aff',
        alignContent: 'center',
        padding: 10,
        marginTop: 15
    },
    favoriteButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#ff809f',
        alignContent: 'center',
        marginTop: 10
    }
});

export default Dictionary;