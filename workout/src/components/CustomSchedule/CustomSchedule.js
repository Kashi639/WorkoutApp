import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomSchedule = ({onPress, text,}) =>{
    return(
        <Pressable 
        onPress={onPress} 
        style={styles.week}>
            <Text style={styles.text}>{text}</Text>
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
        color: '#FFFF',
        alignItems: 'center',
    },
    text_SECONDARY:{
        fontWeight: 'bold',
        color: '#3b71f3',
    },
    text_TERTIARY:{
        color: 'gray',
    }
})

export default CustomSchedule