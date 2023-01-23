import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable, Image, useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../../../assets/images/profile_pic.png';
import CustomPress from '../../components/CustomPress';
import { useNavigation } from '@react-navigation/native';

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
        console.warn('Delete Workouts')
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

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }                                                       //<= till here
    return(
    <ScrollView style={styles.profileScreen}>
            <View style={styles.profile}>
                <View style={{paddingLeft:27, flex:2}}>
                    <Text style={styles.text}>My Profile</Text>
                </View>
                <View style={{alignSelf:'center'}}>
                    <Pressable
                    onPress={onSettingsPressed}
                    >
                     <Ionicons name="settings-sharp" size={30} color="#FFFF"/>
                    </Pressable>
                </View>
            </View>
            
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{paddingHorizontal: 10,paddingVertical: 10,}}>
                   <Image source={Profile} style={{width: 150, height: 150, borderRadius: 150/2}}/>
                </View>
                <View style={{flex:1, flexDirection: 'column', alignItems:'flex-start', paddingLeft:10}}>
                    <Text style={{color:'#536DFE',fontSize: 30, marginBottom: 10, fontWeight: '600',}}>{name}</Text>
                    <Text style={{color:'#B8B8B8', fontSize: 20, marginBottom: 10, fontWeight: '600',}}>Free User</Text>
                    <Text style={{color:'#B8B8B8', fontSize: 20, marginBottom: 10, fontWeight: '600',}}>Level 1</Text>
                </View>
            </View>
            <CustomPress
            text={"Delete my Workouts"} 
            onPress={onDeleteWorkoutPressed}/>
            <CustomPress
            text={"Delete my Account"} 
            onPress={onDeleteAccountPressed}/>
            <CustomPress
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
    },
    text:{
        color:'#FFFF',
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