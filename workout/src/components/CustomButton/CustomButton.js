import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type="PRIMARY"}) =>{
    return(
        <Pressable 
        onPress={onPress} 
        style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    container:{
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY:{
        backgroundColor: '#3b71f3',
    },
    container_SECONDARY:{
        borderColor: '#3b71f3',
        borderWidth: 2,
    },
    container_FOURTH:{
        backgroundColor: 'green',
        width: '25%',
        borderRadius: 5,
    },
    text:{
        fontWeight: 'bold',
        color: 'white',
    },
    text_SECONDARY:{
        fontWeight: 'bold',
        color: '#3b71f3',
    },
    text_TERTIARY:{
        color: 'gray',
    },
    text_FOURTH:{
    color: '#ffff'
    }
})

export default CustomButton