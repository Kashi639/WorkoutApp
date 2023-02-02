import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomSchedule = ({onPress, text,  type="PRIMARY"}) =>{
    return(
        <Pressable 
        onPress={onPress} 
        style={styles.week}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    week:{
        alignItems: 'center',
        flex: 1,
    },

    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignItems: 'center',
    },
    text_SECONDARY:{
        fontWeight: 'bold',
        color: '#3b71f3',
    },
    text_TERTIARY:{
        color: 'gray',
    },
    text_FOURTH:{
        color:'#ffffff'
    }
})

export default CustomSchedule