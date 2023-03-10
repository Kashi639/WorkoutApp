import React from 'react';
import {ImageBackground, View, Text, StyleSheet, Pressable} from 'react-native';

const CustomPress = ({onPress, text, image}) =>{
    return(
        
        <Pressable 
        onPress={onPress} >
            <ImageBackground 
            source={image} 
            resizeMode="cover" 
            style={styles.container}
            imageStyle={{ borderRadius: 10, borderWidth: 0}}>
            <Text style={styles.text}>{text}</Text>
            </ImageBackground>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 40,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        flexDirection: 'row',
    },
    text:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFF',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
      },
})

export default CustomPress