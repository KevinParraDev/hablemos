import React from "react";
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image, Modal,TouchableWithoutFeedback }  from "react-native";
import { Icon } from '@rneui/themed';
import {AnimatedVideoCard}  from './elements/CardVideo.js';
import { useContext } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
import Share from 'react-native-share'
import { Asset } from 'expo-asset';
// import { Alert } from "react-native";


const FavoriteScreen = () => {

    const { favorites, removeFromFavorites } = useContext(FavoritesContext);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setShowSearch(scrollY > 20);
    };

    const openModal = (card) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    const handleDeleteFavorite = () => {

        removeFromFavorites(selectedCard.word);
        setModalVisible(false);

        // Alert.alert(
        //     "Eliminar favorito", 
        //     `¿Estás seguro de que quieres eliminar "${selectedCard?.word}" de favoritos?`,
        //     [
        //         {text: "Cancelar", style: "cancel"},
        //         {text: "Eliminar",
        //             onPress: () => {
        //                 removeFromFavorites(selectedCard.word); 
        //                 setModalVisible(false); 
        //             },
        //             style: "destructive",
        //         },
        //     ],
        //     { cancelable: true }
        // );
    }

    const handleShare = async (imgPath) => {
        try {
            const asset = await Asset.loadAsync(imgPath);
    
            const fileUri = asset[0].localUri || asset[0].uri;
        
            if (!fileUri.startsWith("file://")) {
              throw new Error("La imagen no se descargó correctamente.");
            }
        
            // 3️⃣ Compartir la imagen y el texto
            const options = {
              title: "Compartir imagen y texto",
              message: "Si quieres aprender más, descarga Hablemos 📲🤟🏻",
              url: fileUri, // Ahora es una ruta válida
              type: "image/jpeg",
            };
        
            await Share.open(options);

        } catch (error) {
            console.error("Error al compartir:", error);
        }
    };

    return (
        <View style={styles.container} >
            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Todavía no tienes favoritos</Text>
                </View>
            ) : (
                <FlatList 
                    data={favorites}
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
                />
            )}

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer} >
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                {selectedCard && selectedCard.sourceVideo && (
                                    <>
                                        <Image source={selectedCard.sourceVideo} style={styles.modalImage} />
                                        <Text style={styles.modalText}>{selectedCard.word}</Text>
                                    </>
                                )}
                                {selectedCard && !selectedCard.sourceVideo && (
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

                                    <TouchableOpacity style={styles.trashButton }  onPress={handleDeleteFavorite}>
                                        <Icon 
                                            name= 'trash'
                                            type='font-awesome'
                                            color= '#350066'
                                            containerStyle={styles.trashIcon}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.modalButton} onPress={() => handleShare(selectedCard.source)}>
                                        <Icon 
                                            name= 'share-alt'
                                            type='font-awesome'
                                            color= '#350066'
                                            containerStyle={styles.modalIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffdbde',
    },
    title: {
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
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
        height: '60%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#350066',
        alignItems: 'center'
    },
    modalImage: {
        width: 250,
        height: 320,
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
    trashIcon: {
        position: 'absolute',
        top: 11,
        right: 15
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
    trashButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#ff809f',
        alignContent: 'center',
        marginTop: 10
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    emptyText: {
        color: '#350066',
        fontSize: 15,
        textAlign: 'center'
    }

});


export default FavoriteScreen;