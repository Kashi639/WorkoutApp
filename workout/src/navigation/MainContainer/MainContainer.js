import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../../screens/HomeScreen'
import TempExerciseScreen from '../../screens/TempExerciseScreen'
import TempWorkoutScreen from '../../screens/TempWorkoutScreen'
import DietScreen from '../../screens/DietScreen'
import ProfileScreen from '../../screens/ProfileScreen'

// Scren Names

const homeName = 'Home';
const exerciseName = 'Exercise';
const workoutName = 'Workout';
const dietName = 'Diet';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const MainContainer =()=>{
    return(
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route})=>({
                headerShown: false,
                tabBarIcon: ({focused, color, size})=>{
                    let iconName;
                    let rn = route.name;

                    if(rn === homeName){
                        iconName = focused ? 'home': 'home-outline'
                    } else if(rn === exerciseName){
                        iconName = focused ? 'bicycle': 'bicycle-outline'
                    } else if(rn === workoutName){
                        iconName = focused ? 'barbell': 'barbell-outline'
                    } else if(rn === dietName){
                        iconName = focused ? 'fast-food': 'fast-food-outline'
                    } else if(rn === profileName){
                        iconName = focused ? 'person': 'person-outline'
                    }

                    return <Ionicons name ={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: "#536dfe",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 10
                  },
                  tabBarStyle: [
                    {
                      display: 'flex',
                      padding:10,
                      height:70
                    },
                    null
                  ]
            })}
            >

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={exerciseName} component={TempExerciseScreen}/>
            <Tab.Screen name={workoutName} component={TempWorkoutScreen}/>
            <Tab.Screen name={dietName} component={DietScreen}/>
            <Tab.Screen name={profileName} component={ProfileScreen}/>

            </Tab.Navigator>
    )
}

const styles= StyleSheet.create({
    text:{
        color: 'black'
    },

})

export default MainContainer