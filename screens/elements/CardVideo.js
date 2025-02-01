import React from "react";
import { TouchableHighlight ,StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView} from "react-native";

const VideoCard = ({video, word}) => {

    return (
        <>  
            <TouchableHighlight style={styles.card}>
                <View >
                    <Image source={video} style={styles.video}></Image>
                    <Text style={styles.text}> {word} </Text>
                </View>
            </TouchableHighlight>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        width: 170,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#350066',
        overflow: 'hidden'
    },
    video: {
        width: 170,
        height:150,
        borderRadius: 20,
        borderColor: '#350066',
        borderWidth: 3
    },
    text: {
        color: '#350066',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    }
});

export default VideoCard;