import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import TempScreen from '../screens/TempScreen';

const Stack = createNativeStackNavigator();

const Navigation =()=>{
    return(
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="Temp" component={TempScreen} />
            </Stack.Navigator>
    )
}

export default Navigation