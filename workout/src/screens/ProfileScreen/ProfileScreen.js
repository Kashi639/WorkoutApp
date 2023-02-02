import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable, Image, useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../../../assets/images/profile_pic.png';
import CustomPressTwo from '../../components/CustomPressTwo';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';    //<= changes here

const ProfileScreen = ()=>{
    const navigation = useNavigation();              //<= changes here
    const [isError, setIsError] = useState(false);  //<= changes here
    const [message, setMessage] = useState('');     //<= changes here

    const [name, setName] = useState('');
    useEffect(()=>{
        async function fetchUsername() {
            try {
              const response = await fetch('http://localhost:3000/session');
              const data = await response.json();
              setName(data.name);
            } catch (error) {
              console.error(error);
            }
          }
          fetchUsername();
},[])

    const onSettingsPressed=()=>{
        console.warn('Settings')
    }
    const {height}= useWindowDimensions();

    const onDeleteWorkoutPressed=()=>{
        fetch(`${API_URL}/workouts/delete`, {            //<= changes here
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 500) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else{
                    setIsError(false);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onDeleteAccountPressed=()=>{
        fetch(`${API_URL}/account`, {            //<= changes here
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 500) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else{
                    const nav =() =>{
                     navigation.navigate('SignIn');
                    }
                    setIsError(false);
                    setMessage(jsonRes.message);
                    setTimeout(nav, 3000);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onLogoutPressed=()=>{
        fetch(`${API_URL}/signout`, {            //<= changes here
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 400) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else{
                    const nav =() =>{
                     navigation.navigate('SignIn');
                    }
                    setIsError(false);
                    setMessage(jsonRes.message);
                    setTimeout(nav, 1000);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });                                          
    }

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }                                                       //<= till here
    return(
    <ScrollView style={styles.profileScreen}>
            <View >
            <LinearGradient
                colors={['#ff9900',
                    '#ff9c0e',
                    '#ff9f18',
                    '#ffa21f',
                    '#ffa526',
                    '#ffa82d',
                    '#ffab33',
                    '#ffae38',
                    '#ffb13e',
                    '#ffb443']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profile}
                >
                    <View><Text style={styles.text}>My Profile</Text></View>
                </LinearGradient>
            </View>
            
            <View style={{flex:1, flexDirection:'column',alignItems:'center'}}>
                <View style={{paddingVertical: 20,}}>
                   <Image source={Profile} style={{width: 150, height: 150, borderRadius: 150/2}}/>
                </View>
                    <View><Text style={{color:'#333333',fontSize: 30, marginBottom: 10, fontWeight: '600',}}>{name}</Text></View>
                    <View><Text style={{color:'#666666', fontSize: 20, marginBottom: 10, fontWeight: '600',}}>Free User</Text></View>
                    <View><Text style={{color:'#666666', fontSize: 20, marginBottom: 10, fontWeight: '600',}}>Level 1</Text></View>
            </View>
            <CustomPressTwo
            text={"Delete my Workouts"} 
            onPress={onDeleteWorkoutPressed}/>
            <CustomPressTwo
            text={"Delete my Account"} 
            onPress={onDeleteAccountPressed}/>
            <CustomPressTwo
            text={"Logout"} 
            onPress={onLogoutPressed}/>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
    </ScrollView>
    )
}

const styles= StyleSheet.create({
    profileScreen: {
        flex:1,
        backgroundColor:"#FFFF"
    },
    profile:{
        backgroundColor: '#536DFE',
        // width: '90%',
        paddingHorizontal: 10,
        flex: 1,
        flexDirection:'row',
        justifyContent:'center'
    },
    text:{
        color:'#333333',
        fontSize: 30,
        marginBottom: 10,
        fontWeight: '600',
        alignSelf:"center"
    },
    textTwo:{
        color:'#ffff',
        fontSize: 30,
        marginBottom: 10,
        fontWeight: '600',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
})

export default ProfileScreen