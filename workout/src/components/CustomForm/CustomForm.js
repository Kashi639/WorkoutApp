import React, {useState} from 'react';
import {ScrollView,View,Text,TextInput,StyleSheet} from 'react-native';

const CustomForm =()=>{
    const [wname, setWname]= React.useState('');
    return(
        <ScrollView style={styles.form}>
            <View style={styles.inputs}>
            <Text style={{color:'black', alignSelf:'center'}}>Workout Name:</Text>    
            <TextInput 
             maxLength={30}
             value={wname} 
             onChangeText={setWname}
             style={styles.input} 
             placeholder="Eg. Hybrid Callisthenics"
             placeholderTextColor='grey'
             autoCapitalize="none"></TextInput>
            </View>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    form:{
        backgroundColor: 'white',
    },
    inputs:{
        flex: 1,
        flexDirection:'row',
        paddingTop:30,
        paddingLeft:10,
    },
    input:{
        color:'black',
        borderRadius:12,
        borderWidth:1,
        paddingHorizontal:10,
        marginLeft:12,
        
        

    },
})

export default CustomForm