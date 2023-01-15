import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, autoComplete}) => {
    return (
        <View style={styles.container}>
            <TextInput 
             value={value}
             onChangeText={setValue}
             placeholder= {placeholder}
             placeholderTextColor='grey' 
             style={styles.input}
             secureTextEntry={secureTextEntry}
             autoComplete={autoComplete}
            />
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '90%',

        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderrRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        color: 'black',
    }
})

export default CustomInput