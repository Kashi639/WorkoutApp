import * as React from 'react';
import {Text, View, TextInput, Pressable, StyleSheet,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login(){
    const [email, setEmail]= React.useState('');
    const [pass, setPass]= React.useState('');

    return(
        <View style={{
            padding: 20,
            backgroundColor: '#133E7C',
            flex: 1,
            justifyContent: 'center',
          }}>
            <Text style={{
             alignSelf: 'center',
             fontSize: 30,
             marginBottom: 50,
             color: '#22A0B6',
             fontWeight: '600',
            }}>Login</Text>
            <View style={styles.viewStyle}>
            <Icon name="email" size={30} color={'#9BE6DE'}/>
            <TextInput 
             textContentType={'emailAddress'} 
             onChangeText={text => setEmail(text)} 
             value={email} 
             autoCompleteType={'email'}
             clearButtonMode={'while-editing'}
             keyboardType={'email-address'}
             returnKeyLabel={'next'}
             returnKeyType={'next'}
             underlineColorAndroid={'#FF0000'}
             placeholder={'Email Address'}
             style={styles.textinputStyle}
            />
            </View>
            <View style={styles.viewStyle}>
            <Icon name="lock" size={30} color={'#9BE6DE'}/>
            <TextInput 
             textContentType={'password'} 
             onChangeText={text => setPass(text)} 
             value={pass} 
             autoCompleteType={'password'}
             clearButtonMode={'while-editing'}
             returnKeyLabel={'done'}
             returnKeyType={'done'}
             underlineColorAndroid={'#FF0000'}
             placeholder={'Password'}
             secureTextEntry={true}
             style={styles.textinputStyle}
            />
            </View>
            <View style={{
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <Pressable>
            <View style={{
               paddingHorizontal: 50,
               paddingVertical: 10,
               borderRadius: 8,
               elevation: 8,
               shadowColor: '#0047BB',
               shadowRadius: 8,
               backgroundColor: '#0D2534'}}>
            <Text style={{color: '#9BE6DE'}}>Login</Text>
            </View>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    textinputStyle:{
        flex: 1,
        paddingLeft: 20,
        borderBottomColor: '#9BE6DE',
        borderBottomWidth: 1,
    }
})