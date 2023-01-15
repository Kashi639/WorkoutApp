
import React, {useState} from 'react';
import {Text, View, TextInput, Pressable, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native'

const SignUpScreen = () => {
    const [username, setUsername]= React.useState('');
    const [email, setEmail]= React.useState('');
    const [pass, setPass]= React.useState('');
    const [pass2, setPass2]= React.useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () =>{
        navigation.navigate('ConfirmEmail');
    }

    const onSignInPressed=()=>{
        navigation.navigate('SignIn');
    }

    const onTermsOfUsePressed=()=>{
        console.warn("Terms of Use")
    }
    
    const onPrivacyPolicyPressed=()=>{
        console.warn("Privacy Policy")
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.signupScreen}>
            <Text style={styles.title}>Create an account</Text>
            <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="account" size={30} color="#7037EF"/>
            </View>
            <CustomInput 
            placeholder="Username" 
            value={username} 
            setValue ={setUsername}
            autoComplete="username"
            />
            </View>
            <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="email" size={30} color="#7037EF"/>
            </View>
            <CustomInput 
            placeholder="Email Address" 
            value={email} 
            setValue ={setEmail}
            autoComplete="email"
            />
            </View>
            <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="lock" size={30} color="#7037EF"/>
            </View>
            <CustomInput 
            placeholder="Password" 
            value={pass} 
            setValue ={setPass}
            secureTextEntry={true}
            autoComplete="password"
            />
            </View>
            <View style={styles.viewStyle}>
            <View alignSelf='center'>
            <Icon name="lock" size={30} color="#7037EF"/>
            </View>
            <CustomInput 
            placeholder="Repeat Password" 
            value={pass2} 
            setValue ={setPass2}
            secureTextEntry={true}
            autoComplete="password"
            />
            </View>
            <CustomButton text={"Register"} onPress={onRegisterPressed}/>

            <Text style={styles.text}>
                By registering, you confirm that you accept our{' '} 
                <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '} 
                <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Private Policy</Text></Text>

            <CustomButton 
            text={"Have an account? Sign in"} 
            onPress={onSignInPressed}
            type="TERTIARY"/>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051c60',
        margin: 10,
    },
    signupScreen: {
        padding: 20,
        backgroundColor: '#FFFF',
        flex: 1,
        justifyContent: 'center',
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
        backgroundColor: '#0D2534'},
    text:{
        color: 'gray',
        marginVertical: 10,
    },    
    link:{
        color: '#fdb075'
    },
})

export default SignUpScreen