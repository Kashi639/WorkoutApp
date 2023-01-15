import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomPress from '../../components/CustomPress';
import { useNavigation } from '@react-navigation/native';

const WorkoutScreen = ()=>{
    const navigation = useNavigation();
    const onHybridWorkoutPressed =()=>{
        navigation.navigate('DynamicWorkout',{id:1});
    }
    var onHITWorkoutPressed =()=>{
        navigation.navigate('DynamicWorkout',{id:2});
    }
    const onAddPressed =()=>{
        navigation.navigate('CustomForm');
    }
    return(
        <ScrollView style={styles.workoutScreen}>
        <CustomPress
        text={"Hybrid Workout"} 
        onPress={onHybridWorkoutPressed}/>
        <CustomPress
        text={"HIT Workout"} 
        onPress={onHITWorkoutPressed}/>
        <CustomPress
        text={"Add your own Workout Routine"} 
        onPress={onAddPressed}/>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    workoutScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
})

export default WorkoutScreen