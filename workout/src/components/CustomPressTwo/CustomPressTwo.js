import React from 'react';
import {ImageBackground, View, Text, StyleSheet, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomPressTwo = ({onPress, text,}) =>{
    return(
        
        <Pressable 
        onPress={onPress} >
            <LinearGradient
            colors={['#333333',
                '#404040',
                '#4d4d4d',
                '#5a5a5a',
                '#686868',
                '#767676',
                '#848484',
                '#939393',
                '#a2a2a2',
                '#b1b1b1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
            >
            <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    container:{
        // backgroundColor: '#536DFE',
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

export default CustomPressTwo