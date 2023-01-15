import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from '../../screens/WorkoutScreen';
import DynamicWorkoutScreen from '../../screens/DynamicWorkoutScreen';
import CustomForm from '../../components/CustomForm';


const Stack = createNativeStackNavigator();

const WorkoutContainer =()=>{
    return(
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Workouts" component={WorkoutScreen} />
                <Stack.Screen name="DynamicWorkout" component={DynamicWorkoutScreen} />
                <Stack.Screen name="CustomForm" component={CustomForm} />
            </Stack.Navigator>
    )
}

export default WorkoutContainer