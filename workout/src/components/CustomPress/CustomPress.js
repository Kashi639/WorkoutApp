import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomPress = ({onPress, text,}) =>{
    return(
        
        <Pressable 
        onPress={onPress} >
            <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            </View>
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
})

export default CustomPress