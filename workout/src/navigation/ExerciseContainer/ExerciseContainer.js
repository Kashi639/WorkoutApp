import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseScreen from '../../screens/ExerciseScreen';
import DynamicExerciseScreen from '../../screens/DynamicExerciseScreen';


const Stack = createNativeStackNavigator();

const ExerciseContainer =()=>{
    return(
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Exercises" component={ExerciseScreen} />
                <Stack.Screen name="DynamicExercise" component={DynamicExerciseScreen} />
            </Stack.Navigator>
    )
}

export default ExerciseContainer