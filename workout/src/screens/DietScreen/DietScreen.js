import React,{useState, useEffect} from 'react';
import {Modal, Pressable, TextInput, Alert, View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomPress from '../../components/CustomPress';
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';

const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';

const DietScreen = ()=>{

    const breakfast=require('../../../assets/images/breakfast.jpg')
    const lunch=require('../../../assets/images/lunch.jpg')
    const snacks=require('../../../assets/images/snacks.jpg')
    const dinner=require('../../../assets/images/dinner.jpg')

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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View >
          <LinearGradient
            colors={['#666666',
                '#767676',
                '#868686',
                '#969696',
                '#a7a7a7',
                '#b8b8b8',
                '#c9c9c9',
                '#dbdbdb',
                '#ededed',
                '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalView}
            >
            <Text style={styles.modalText}>Add your {type} calories!</Text>
            <TextInput 
             maxLength={30}
             value={calorie} 
             onChangeText={setCalorie}
             style={styles.input} 
             placeholderTextColor='grey'
             autoCapitalize="none"></TextInput>
             <Pressable 
             onPress={onAddPressed}>
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
                style={styles.container5}
                >
             <Text style={styles.text4}>Add Calories</Text>
             </LinearGradient>
             </Pressable>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            </LinearGradient> 
          </View>
        </View>
        </Modal>
        
        </View>
           <View>
           <LinearGradient
            colors={['#333333',
                '#404040',
                '#4d4d4d',
                '#5a5a5a',
                '#686868',
                '#767676',
                '#848484',
                '#939393',
                '#a2a2a2',
                '#b1b1b1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
            >
            <View style={styles.containerTwo}>
            <View style={{justifyContent:'center'}}><Text style={styles.text1}>Eaten:</Text></View>
            <View style={{justifyContent:'center'}}><Text style={[styles.text1,]}>{inputCalorie}</Text></View>
            </View>
            <View style={styles.containerTwo}>
            <View><Text style={styles.text2}>Burned:</Text></View>
            <View><Text style={[styles.text2,]}>{outputCalorie}</Text></View>
            </View>
            <View style={styles.containerTwo}>
            <View><Text style={styles.text3}>Left:</Text></View>
            <View><Text style={[styles.text3,]}>{left}</Text></View>
            </View>
            <Text style={styles.text}>{calorieStatus}</Text>
            </LinearGradient>
           </View>
           <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly'}}>
           <View style={{flex:1, flexDirection:'row',paddingLeft:17,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#333333', fontSize:20, fontWeight:'bold'}}>Calories Burned:</Text>
            <TextInput 
             maxLength={30}
             value={burned_calorie} 
             onChangeText={setBurned_calorie}
             style={styles.input} 
             placeholderTextColor='grey'
             autoCapitalize="none"></TextInput>
             </View>
            <View style={{flex:1, flexDirection:'row',justifyContent:'space-evenly'}}>
             <Pressable 
             onPress={onSubmitPressed} 
             >
            <LinearGradient
             colors={['#00ff00',
                '#00ff2d',
                '#00ff42',
                '#00ff53',
                '#00ff61',
                '#00ff6e',
                '#00ff7a',
                '#00ff85',
                '#00ff8f',
                '#00ff99']}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 1 }}
             style={styles.container4}
             >
             <Text style={styles.text4}>Submit</Text>
             </LinearGradient>
             </Pressable>

             <Pressable 
             onPress={onClearPressed}>
                <LinearGradient
             colors={['#ff1a00',
                '#ff331a',
                '#ff442c',
                '#ff533b',
                '#ff604a',
                '#ff6d58',
                '#ff7966',
                '#ff8474',
                '#ff8f81',
                '#ff9a8e'
                ]}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 1 }}
             style={styles.container4}
             >
             <Text style={styles.text4}>Clear</Text>
             </LinearGradient>
             </Pressable>
            </View>
           </View>
           <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
           <CustomPress
           text={"Breakfast"}
           onPress={onBreakfastPressed}
           image={breakfast}/>
           <CustomPress
           text={"Lunch"}
           onPress={onLunchPressed}
           image={lunch}/>
           <CustomPress
           text={"Snacks"}
           onPress={onSnacksPressed}
           image={snacks}/>
           <CustomPress
           text={"Dinner"}
           onPress={onDinnerPressed}
           image={dinner}/>
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
    containerTwo:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    text:{
        color:'#FFFFFF',
        fontSize: 40,  
        fontWeight: '600',
    },
    text1:{
        color:'#00ff99',
        fontSize: 40,  
        fontWeight: '600',
    },
    text2:{
        color:'#ff1a00',
        fontSize: 40,
        fontWeight: '600',
    },
    text3:{
        color:'#FFFFFF',
        fontSize: 40,
        fontWeight: '600',
    },
    containerTwo:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    },
    modalView: {
        width:350,
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
        color:'#ffffff',
        fontSize:20,
        fontWeight:'bold',
        marginBottom: 15,
        textAlign: 'center',
      },
      input:{
        width:150,
        backgroundColor:'#FFFFFF',
        fontWeight:'bold',
        fontSize:20,
        color:'#333333',
        borderColor:'#333333',
        borderRadius:12,
        borderWidth:2,
        paddingHorizontal:25,
        marginHorizontal:20,
        textAlign:'center',
        marginVertical:20,
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
    container4:{
        width: 100,
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container5:{
        width: 150,
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    text4:{
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})


export default DietScreen