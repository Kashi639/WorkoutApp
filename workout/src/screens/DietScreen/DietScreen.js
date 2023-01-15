import * as React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomPress from '../../components/CustomPress';

const DietScreen = ()=>{
    const onBreakfastPressed =()=>{
        console.warn('Breakfast')
    }
    const onLunchPressed =()=>{
        console.warn('Lunch')
    }
    const onSnacksPressed =()=>{
        console.warn('Snacks')
    }
    const onDinnerPressed =()=>{
        console.warn('Dinner')
    }
    return(
    <ScrollView style={styles.dietScreen}>
           <View style={styles.container}>
            <View style={styles.containerTwo}>
            <Text style={styles.text}>Eaten:</Text>
            <Text style={styles.text}>1234</Text>
            </View>
            <View style={styles.containerTwo}>
            <Text style={styles.text}>Left:</Text>
            <Text style={styles.text}>1234</Text>
            </View>
            <View style={styles.containerTwo}>
            <Text style={styles.text}>Burned:</Text>
            <Text style={styles.text}>1234</Text>
            </View>
           </View>
           <CustomPress
           text={"Breakfast"}
           onPress={onBreakfastPressed}/>
           <CustomPress
           text={"Lunch"}
           onPress={onLunchPressed}/>
           <CustomPress
           text={"Snacks"}
           onPress={onSnacksPressed}/>
           <CustomPress
           text={"Dinner"}
           onPress={onDinnerPressed}/>
    </ScrollView>
    )
}

const styles= StyleSheet.create({
    dietScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
    container:{
        backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 20,
        flex: 1,
        flexDirection:'column',
    },
    text:{
        color:'#FFFF',
        fontSize: 40,
        marginBottom: 50,
        fontWeight: '600',
    },
    containerTwo:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    },
})

export default DietScreen