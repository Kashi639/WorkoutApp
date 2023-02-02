import * as React from 'react';
import {View, Text, StyleSheet, ScrollView,} from 'react-native';
import CustomPress from '../../components/CustomPress';
import { useNavigation } from '@react-navigation/native';

const ExerciseScreen = ()=>{
    const navigation = useNavigation();

    const img1=require('../../../assets/images/pushups.jpg')
    const img2=require('../../../assets/images/pullups.jpg')
    const img3=require('../../../assets/images/squats.jpg')
    const img4=require('../../../assets/images/leg_raises.jpg')
    const img5=require('../../../assets/images/bridges.jpg')
    const img6=require('../../../assets/images/twists.jpg')
    
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
        onPress={onPushupsPressed}
        image={img1}/>
        <CustomPress
        text={"Pullups"} 
        onPress={onPullupsPressed}
        image={img2}/>
        <CustomPress
        text={"Squats"} 
        onPress={onSquatsPressed}
        image={img3}/>
        <CustomPress
        text={"Leg Raises"} 
        onPress={onLegRaisesPressed}
        image={img4}/>
        <CustomPress
        text={"Bridges"} 
        onPress={onBridgesPressed}
        image={img5}/>
        <CustomPress
        text={"Twists"} 
        onPress={onTwistsPressed}
        image={img6}/>
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