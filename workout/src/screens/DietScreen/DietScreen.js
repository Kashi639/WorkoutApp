import React,{useState, useEffect} from 'react';
import {Modal, Pressable, TextInput, Alert, View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomPress from '../../components/CustomPress';
import CustomButton from '../../components/CustomButton';

const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';

const DietScreen = ()=>{

    const [type, setType] = useState('');
    const [calorie, setCalorie] = useState();
    const [burned_calorie, setBurned_calorie] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [inputCalorie, setInputCalorie] = useState(0);
    const [outputCalorie, setOutputCalorie] = useState(0);
    const [left, setLeft] = useState(0);
    const [calorieStatus, setCalorieStatus] = useState('');

    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    useEffect(() => {
        fetch('http://localhost:3000/diet/sum')
          .then((response) => response.json())
          .then((data) => setInputCalorie(data.inputCalorie))
          .catch((error) => console.error(error));
      }, [calorie]);

    useEffect(()=>{
        fetch('http://localhost:3000/diet/sum/burned')
          .then((response) => response.json())
          .then((data) => setOutputCalorie(data.outputCalorie))
          .catch((error) => console.error(error));
    }, [burned_calorie])

    useEffect(()=>{
        const x=inputCalorie-outputCalorie;
        if(x<0){
            setCalorieStatus('(Calorie Deficit)');
        } else if(x>0){
            setCalorieStatus('(Calorie Surplus)')
        } else {
            setCalorieStatus('')
        }
        setLeft(x);
    })

    // useEffect(() => {
    //     const today = new Date();
    //     today.setHours(12, 0, 0);
    //     const timeTill11Am = today.getTime() - new Date().getTime();
    //     if (timeTill11Am > 0) {
    //         setTimeout(() => {
    //             fetch('http://localhost:3000/diet/delete')
    //         }, timeTill11Am);
    //     }
    // }, []);

    const onBreakfastPressed =()=>{
        setCalorie(null);
        setType('Breakfast');
        setMessage(null);
        setModalVisible(true);
    }
    const onLunchPressed =()=>{
        setCalorie(null);
        setType('Lunch');
        setMessage(null);
        setModalVisible(true);
    }
    const onSnacksPressed =()=>{
        setCalorie(null);
        setType('Snacks');
        setMessage(null);
        setModalVisible(true);
    }
    const onDinnerPressed =()=>{
        setCalorie(null);
        setType('Dinner');
        setMessage(null);
        setModalVisible(true);
    }
    const onAddPressed = ()=>{
        const payload = {
            type,
            calorie,
        };
        fetch(`http://localhost:3000/diet`, {
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
                    const nav =()=>{
                        setMessage(null);
                    }
                    setIsError(true);
                    setMessage(jsonRes.message);
                    setTimeout(nav, 1000)
                } else {
                    const nav =() =>{
                        setModalVisible(!modalVisible);
                        setMessage(null);
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
    };

    const onSubmitPressed = () =>{
        setType("Burned");
        const payload = {
            type,
            burned_calorie,
        };
        fetch(`http://localhost:3000/diet/burned`, {
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
                    const nav =() =>{
                        setMessage(null)
                    }
                    setIsError(true);
                    setMessage(jsonRes.message);
                    setTimeout(nav, 1000);
                } else {
                    const nav =() =>{
                        setMessage(null)
                        setBurned_calorie(null)
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

    const onClearPressed =()=>{
        setType("Burned");
        fetch(`http://localhost:3000/diet/delete/${type}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        })
        .then(async res => {
            try {
                const jsonRes = await res.json();
                if(res.status === 500){
                    const nav =() =>{
                        setMessage(null)
                    }
                    setIsError(true);
                    setMessage(jsonRes.message);
                    setTimeout(nav, 1000);
                } else{
                    const nav =() =>{
                        setMessage(null)
                        setBurned_calorie(null)
                    }
                    setIsError(false);
                    setMessage(jsonRes.message);
                    setTimeout(nav, 1000);
                }
            } catch (err) {
                console.log(err);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getMessage = () => {
            return message
    }

    return(
    <ScrollView style={styles.dietScreen}>
        <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add your {type} calories!</Text>
            <TextInput 
             maxLength={30}
             value={calorie} 
             onChangeText={setCalorie}
             style={styles.input} 
             placeholderTextColor='grey'
             autoCapitalize="none"></TextInput>
            <CustomButton
            text={"Add Calories"}
            onPress={onAddPressed}/>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text> 
          </View>
        </View>
        </Modal>
        </View>
           <View style={styles.container}>
            <View style={styles.containerTwo}>
            <Text style={styles.text}>Eaten:</Text>
            <Text style={styles.text}>{inputCalorie}</Text>
            </View>
            <View style={styles.containerTwo}>
            <Text style={styles.text}>Burned:</Text>
            <Text style={styles.text}>{outputCalorie}</Text>
            </View>
            <View style={styles.containerTwo}>
            <Text style={styles.text}>Left:</Text>
            <Text style={styles.text}>{left}</Text>
            </View>
            <Text style={styles.text}>{calorieStatus}</Text>
           </View>
           <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly'}}>
           <View style={{flex:1, flexDirection:'row',paddingLeft:17,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'black',}}>Calories Burned:</Text>
            <TextInput 
             maxLength={30}
             value={burned_calorie} 
             onChangeText={setBurned_calorie}
             style={styles.input} 
             placeholderTextColor='grey'
             autoCapitalize="none"></TextInput>
             </View>
             <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
            <CustomButton
            type={"FOURTH"}
            text={"Submit"}
            onPress={onSubmitPressed}/>
            <CustomButton
            type={"FOURTH"}
            text={"Clear"}
            onPress={onClearPressed}/>
            </View>
           </View>
           <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
           <CustomPress
           text={"Breakfast"}
           onPress={onBreakfastPressed}/>
           <CustomPress
           text={"Lunch"}
           onPress={onLunchPressed}/>
           <CustomPress
           text={"Snacks"}
           onPress={onSnacksPressed}/>
           <CustomPress
           text={"Dinner"}
           onPress={onDinnerPressed}/>
    </ScrollView>
    )
}

const styles= StyleSheet.create({
    dietScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    container:{
        backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 20,
        flex: 1,
        flexDirection:'column',
    },
    text:{
        color:'#FFFF',
        fontSize: 40,
        marginBottom: 50,
        fontWeight: '600',
    },
    containerTwo:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        color:'black',
        marginBottom: 15,
        textAlign: 'center',
      },
      input:{
        color:'black',
        borderRadius:12,
        borderWidth:1,
        paddingHorizontal:50,
        marginHorizontal:20,
        textAlign:'center',
        marginVertical:20,
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
})

export default DietScreen