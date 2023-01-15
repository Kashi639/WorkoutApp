import * as React from 'react';
import {View, Text, StyleSheet, ScrollView,} from 'react-native';
import CustomPress from '../../components/CustomPress';
import { useNavigation } from '@react-navigation/native';

const ExerciseScreen = ()=>{
    const navigation = useNavigation();
    
    const onPushupsPressed =()=>{
        navigation.navigate('DynamicExercise',{id:1});
    }
    const onPullupsPressed =()=>{
        navigation.navigate('DynamicExercise',{id:2});
    }
    const onSquatsPressed =()=>{
        navigation.navigate('DynamicExercise',{id:3});
    }
    const onLegRaisesPressed =()=>{
        navigation.navigate('DynamicExercise',{id:4});
    }
    const onBridgesPressed =()=>{
        navigation.navigate('DynamicExercise',{id:5});
    }
    const onTwistsPressed =()=>{
        navigation.navigate('DynamicExercise',{id:6});
    }
    return(
    <ScrollView style={styles.exerciseScreen}>
        <CustomPress
        text={"Pushups"} 
        onPress={onPushupsPressed}/>
        <CustomPress
        text={"Pullups"} 
        onPress={onPullupsPressed}/>
        <CustomPress
        text={"Squats"} 
        onPress={onSquatsPressed}/>
        <CustomPress
        text={"Leg Raises"} 
        onPress={onLegRaisesPressed}/>
        <CustomPress
        text={"Bridges"} 
        onPress={onBridgesPressed}/>
        <CustomPress
        text={"Twists"} 
        onPress={onTwistsPressed}/>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    exerciseScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
})
    

export default ExerciseScreen