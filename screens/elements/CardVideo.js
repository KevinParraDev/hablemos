import React, {useRef, useEffect} from "react";
import {StyleSheet, View, Text, Image, Animated, TouchableOpacity} from "react-native";

export const VideoCard = ({video, word, onPress }) => {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} >
            <View >
                <Image source={video} style={styles.video}></Image>
                <Text style={styles.text}> {word} </Text>
            </View>
        </TouchableOpacity>
    );
}

export const AnimatedVideoCard = ({video, word, onPress, index}) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity,{
            toValue: 1,
            duration: 1000,
            delay: index * 300,
            useNativeDriver: true
        }).start();
    }, [opacity, index]);

    return (
        <Animated.View style={{opacity}}>
            <VideoCard video={video} word={word} onPress={onPress}></VideoCard>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        width: 170,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#350066',
        overflow: 'hidden',
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