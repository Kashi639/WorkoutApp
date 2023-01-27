import React, {useCallback, useState} from 'react';
import {ScrollView,View,Text,TextInput,StyleSheet,TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';

DropDownPicker.setListMode("SCROLLVIEW")

const CustomForm =({route})=>{
    const [workout_name, setWorkout_name]= useState('');
    const [dayItems, setDayItems]=useState([
        {label: 'Monday', value: 'Monday'},
        {label: 'Tuesday', value: 'Tuesday'},
        {label: 'Wednesday', value: 'Wednesday'},
        {label: 'Thursday', value: 'Thursday'},
        {label: 'Friday', value: 'Friday'},
        {label: 'Saturday', value: 'Saturday'},
        {label: 'Sunday', value: 'Sunday'},
    ]);
    const [exercise1Items, setExercise1Items]=useState([
        {label: 'Pushups', value:'Pushups'},
        {label: 'Pullups', value:'Pullups'},
        {label: 'Squats', value:'Squats'},
        {label: 'Leg Raises', value:'Leg Raises'},
        {label: 'Bridges', value:'Bridges'},
        {label: 'Twists', value:'Twists'},
    ]);
    const [exercise2Items, setExercise2Items]=useState([
        {label: 'Pushups', value:'Pushups'},
        {label: 'Pullups', value:'Pullups'},
        {label: 'Squats', value:'Squats'},
        {label: 'Leg Raises', value:'Leg Raises'},
        {label: 'Bridges', value:'Bridges'},
        {label: 'Twists', value:'Twists'},
    ]);
    const [e1r1, setE1r1]=useState(null);
    const [e1r2, setE1r2]=useState(null);
    const [e1r3, setE1r3]=useState(null);
    const [e2r1, setE2r1]=useState(null);
    const [e2r2, setE2r2]=useState(null);
    const [e2r3, setE2r3]=useState(null);
    const [dayOpen, setDayOpen] = useState(false);
    const [exercise1Open, setExercise1Open] = useState(false);
    const [exercise2Open, setExercise2Open] = useState(false);
    const [day, setDay] = useState('');
    const [exercise1, setExercise1] = useState('');
    const [exercise2, setExercise2] = useState('');
    
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const onDayOpen = useCallback(() => {
        setExercise1Open(false);
        setExercise2Open(false);
      }, []);

      const onExercise1Open = useCallback(() => {
        setDayOpen(false);
        setExercise2Open(false);
      }, []);

      const onExercise2Open = useCallback(() => {
        setExercise1Open(false);
        setDayOpen(false);
      }, []);


    const onSubmitHandler =()=>{
        const payload={
                workout_name,
                day,
                exercise1,
                exercise2,
                e1r1,
                e1r2,
                e1r3,
                e2r1,
                e2r2,
                e2r3
            }
        fetch(`${API_URL}/form`, {
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
    };  
    
    const getMessage = () => {
            return message
    }

    return(
        <ScrollView style={styles.form}>
            <View style={styles.inputs}>
            <Text style={{color:'black', alignSelf:'center'}}>Workout Name:</Text>    
            <TextInput 
             maxLength={30}
             value={workout_name} 
             onChangeText={setWorkout_name}
             style={styles.input} 
             placeholder="Eg. Hybrid Callisthenics"
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
            </View>

            <View style={styles.inputs}>
            <Text style={{color:'black', alignSelf:'center'}}>Day:</Text>    
            <View style={{marginLeft:12, marginRight:20}}>
            <DropDownPicker
             open={dayOpen}
             value={day}
             items={dayItems}
             setOpen={setDayOpen}
             setValue={setDay}
             setItems={setDayItems}
             zIndex={3000}
            />
            </View>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={styles.inputs_2}>
            <Text style={{color:'black', alignSelf:'flex-start'}}>Exercise 1:</Text>    
            <DropDownPicker
             style={{marginRight:20, marginTop:12}}
             open={exercise1Open}
             value={exercise1}
             items={exercise1Items}
             setOpen={setExercise1Open}
             setValue={setExercise1}
             setItems={setExercise1Items}
             zIndex={2000}
            />
            </View>
            <View style={styles.inputs_2}>
            <Text style={{color:'black', alignSelf:'flex-start'}}>Exercise 2:</Text>    
            <DropDownPicker
            style={{marginRight:20, marginTop:12}}
             open={exercise2Open}
             value={exercise2}
             items={exercise2Items}
             setOpen={setExercise2Open}
             setValue={setExercise2}
             setItems={setExercise2Items}
             zIndex={1000}
            />
            </View>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
            <View style={styles.inputs_2}>
            <Text style={{color:'black', alignSelf:'flex-start'}}>Reps:</Text>
            <View style={{flex:1,flexDirection:'row',marginTop:12}}>
            <TextInput 
             maxLength={30}
             value={e1r1} 
             onChangeText={setE1r1}
             style={styles.input_3} 
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
             <TextInput 
             maxLength={30}
             value={e1r2} 
             onChangeText={setE1r2}
             style={styles.input_3} 
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
             <TextInput 
             maxLength={30}
             value={e1r3} 
             onChangeText={setE1r3}
             style={styles.input_3} 
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
            </View>
            </View>
            <View style={styles.inputs_2}>
            <Text style={{color:'black', alignSelf:'flex-start'}}>Reps:</Text>
            <View style={{flex:1,flexDirection:'row', marginTop:12}}>
            <TextInput 
             maxLength={30}
             value={e2r1} 
             onChangeText={setE2r1}
             style={styles.input_3} 
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
             <TextInput 
             maxLength={30}
             value={e2r2} 
             onChangeText={setE2r2}
             style={styles.input_3} 
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
             <TextInput 
             maxLength={30}
             value={e2r3} 
             onChangeText={setE2r3}
             style={styles.input_3} 
             placeholderTextColor='grey'
             autoCapitalize="words"></TextInput>
            </View>
            </View>
            </View>

            

            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text> 
            <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.button, {backgroundColor:'#ffff'}, {borderWidth:1}, {borderColor:'#7037EF'}]} onPress={()=>{navigation.navigate({
                                                            name: 'Workouts',
                                                            params: { workoutname: workout_name},
                                                            merge: true,
                                                            });
                                                            }}>
                <Text style={[styles.buttonText, {color: '#7037EF'}]}>Go Back</Text>
            </TouchableOpacity>  
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    form:{
        backgroundColor: 'white',
        flex:1,
    },
    inputs:{
        flex: 1,
        flexDirection:'row',
        paddingTop:30,
        paddingLeft:10,
    },
    input:{
        color:'black',
        borderRadius:12,
        borderWidth:1,
        paddingHorizontal:10,
        marginLeft:12,
    },
    inputs_2:{
        flex: 1,
        flexDirection:'column',
        paddingTop:30,
        paddingLeft:10,
        marginRight:10
    },
    input2:{
        marginRight:20, 
        marginTop:12,
        color:'black',
        borderRadius:12,
        borderWidth:1,
        paddingHorizontal:10,
        marginLeft:0,
    },
    input_3:{
        color:'black',
        borderRadius:12,
        borderWidth:1,
        paddingHorizontal:10,
        marginLeft:0,
        marginRight:10,
        textAlign:'center',
    },
    button:{
        width: '50%',
        backgroundColor: '#7037EF',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '25%',
        marginVertical: 20,
    },
    buttonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
})

export default CustomForm