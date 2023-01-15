
import React, {useState} from 'react';
import {Text, View, TextInput, Pressable, StyleSheet, Image, useWindowDimensions, ScrollView, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';

//my ip : 180.233.148.202
console.log(API_URL)
const SignInScreen = () => {
    const [email, setEmail]= React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword]= React.useState('');

    const {height}= useWindowDimensions();
    const navigation = useNavigation();

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
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

    const onSubmitHandler = () => {
        // navigation.navigate('Temp');
        const payload = {
            email,
            name,
            password,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    setMessage(jsonRes.message);
                    if (isLogin == true) {
                        navigation.navigate('Temp');
                    } else {
                        isLogin=true;
                        onChangeHandler(isLogin);
                    }
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }


    /*const onSignInPressed = () =>{

        navigation.navigate('Temp');
        //validate user, sending it to backend

    }

    const onForgotPasswordPressed =()=>{
        navigation.navigate('ForgotPassword');
        //then enter email to reset pass
    }

    const onSignUpPressed=()=>{
        navigation.navigate('SignUp');
    }*/

    return(
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20,
            backgroundColor: '#FFFF',
            flex: 1,
            justifyContent: 'center',}}>
            <View style={styles.logoStyle}>
                <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain"/>
            </View>
            <Text style={styles.loginText}>Welcome!</Text>
            <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="account" size={30} color="#7037EF"/>
            </View>
            <View style={styles.inputs}>
            <TextInput 
             value={name} 
             onChangeText={setName}
             style={styles.input} 
             placeholder="Username"
             placeholderTextColor='grey'
             autoComplete="name"
             autoCapitalize="none"></TextInput>
            </View>
            </View>
            {!isLogin && <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="email" size={30} color="#7037EF"/>
            </View>
            <View style={styles.inputs}>
            <TextInput 
             value={email} 
             onChangeText={setEmail}
             style={styles.input} 
             placeholder="Email Address"
             placeholderTextColor='grey'
             autoComplete="email"
             autoCapitalize="none"></TextInput>
            </View>
            </View>}
            <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="lock" size={30} color="#7037EF"/>
            </View>
            <View style={styles.inputs}>
            <TextInput 
             value={password}
             onChangeText={setPassword}
             placeholder= "Password"
             placeholderTextColor='grey' 
             style={styles.input}
             secureTextEntry={true}
             autoComplete="password"
            />
            </View>
            </View>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    inputs:{
        backgroundColor: 'white',
        width: '90%',

        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderrRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        color: 'black',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    button:{
        width: '80%',
        backgroundColor: '#7037EF',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: '#7037EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: '#7037EF',
        fontSize: 16,
        fontWeight: '400',
    },

    logoStyle:{
       alignItems: 'center',
       padding: 20,
    },
    logo:{
        width:'70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    signinScreen: {
        padding: 20,
        backgroundColor: '#FFFF',
        flex: 1,
        justifyContent: 'center',
    },
    loginText: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 50,
        color: '#7037EF',
        fontWeight: '600',
    },
    viewStyle: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    textinputStyle:{
        flex: 1,
        paddingLeft: 20,
        borderBottomColor: '#9BE6DE',
        borderBottomWidth: 1,
    },
    loginStyle: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 8,
        shadowColor: '#0047BB',
        shadowRadius: 8,
        backgroundColor: '#0D2534'
    },
    message: {
            fontSize: 16,
            marginVertical: '5%',
        },
})

export default SignInScreen