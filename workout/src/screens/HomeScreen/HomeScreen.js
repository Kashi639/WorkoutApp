import React,{useState,useEffect} from 'react';
import{Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import CustomSchedule from '../../components/CustomSchedule';
import LinearGradient from 'react-native-linear-gradient';

// const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';

const HomeScreen =()=>{
    const [name, setName] = useState('');
    const [inputCalorie, setInputCalorie] = useState(0);
    const [outputCalorie, setOutputCalorie] = useState(0);
    const [left, setLeft] = useState(0);
    const [day, setDay] =useState('')
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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

    useEffect(() => {
        fetch('http://localhost:3000/diet/sum')
          .then((response) => response.json())
          .then((data) => setInputCalorie(data.inputCalorie))
          .catch((error) => console.error(error));
      }, []);

    useEffect(()=>{
        fetch('http://localhost:3000/diet/sum/burned')
          .then((response) => response.json())
          .then((data) => setOutputCalorie(data.outputCalorie))
          .catch((error) => console.error(error));
    }, [])

    useEffect(()=>{
        const x=inputCalorie-outputCalorie;
        setLeft(x);
    })
    
    const onMPressed =()=>{
        setDay("monday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onTPressed =()=>{
        setDay("tuesday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onWPressed =()=>{
        setDay("wednesday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onTHPressed =()=>{
        setDay("Thursday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onFPressed =()=>{
        setDay("friday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onSPressed =()=>{
        setDay("saturday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onSUPressed =()=>{
        setDay("sunday")
        fetch(`http://localhost:3000/workouts/${day}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(responseJson => {
      setData(responseJson);
      setModalVisible(true);
    })
    .catch(error => {
      console.error(error);
    });
    }

    return(
        <ScrollView style={styles.homeScreen}>
        <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ScrollView contentContainerStyle={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,}}>
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
            
            <TouchableOpacity style={styles.scontainer}>
            {data && data.length > 0 && data.map(item => (
            <View key={item.id} style={styles.itemContainer}>
            <Text style={{color:'black'}}>{item.workout_name}</Text>
            <Text style={{color:'black'}}>{item.exercise1}</Text>
            <Text style={{color:'black'}}>{item.exercise2}</Text>
            </View>
            ))}</TouchableOpacity> 
            
            </LinearGradient> 
          </View>
        </ScrollView>
        </Modal>
        </View>

            <View >
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
            <Text style={styles.helloText} user={this.user}>Hello {name}</Text>
            </LinearGradient>
            </View>
            <View>
                <Text style={styles.childText}>Schedule</Text>
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
                style={styles.childContainer}
                >
                <CustomSchedule
                text={"M"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"T"} 
                onPress={onTPressed}/>
                <CustomSchedule
                text={"W"} 
                onPress={onWPressed}/>
                <CustomSchedule
                text={"T"} 
                onPress={onTHPressed}/>
                <CustomSchedule
                text={"F"} 
                onPress={onFPressed}/>
                <CustomSchedule
                text={"S"} 
                onPress={onSPressed}/>
                <CustomSchedule
                text={"S"} 
                onPress={onSUPressed}/>
                </LinearGradient>
                </View>
            </View>
                
            <View>
                <Text style={styles.childText}>Goals</Text>
                <View >
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
                style={styles.childContainer}
                >
                <CustomSchedule
                text={"Gain muscle"} 
                onPress={onMPressed}
                type={'FOURTH'}/>
                <CustomSchedule
                text={"Gain strength"} 
                onPress={onMPressed}
                type={'FOURTH'}/>
                <CustomSchedule
                text={"Lose fat"} 
                onPress={onMPressed}
                type={'FOURTH'}/>
                </LinearGradient>
                </View>
            </View>
            <View>
                <Text style={styles.childText}>Calories Burnt</Text>
                <View >
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
                style={styles.childContainer}
                >
                        <View style={styles.calorieChild}>
                            <Text style={styles.calorieText1}>Eaten:</Text>
                            <Text style={styles.calorieText1}>{inputCalorie}</Text>
                        </View>
                        <View style={styles.calorieChild}>
                            <Text style={styles.calorieText2}>Burnt:</Text>
                            <Text style={styles.calorieText2}>{outputCalorie}</Text>
                        </View>
                        <View style={styles.calorieChild}>
                            <Text style={styles.calorieText}>Left:</Text>
                            <Text style={styles.calorieText}>{left}</Text>
                    </View>
                </LinearGradient>
                </View>
            </View>
            <View>
                <Text style={styles.childText}>Explore more</Text>
                <View >
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
                style={styles.childContainer}
                >
                    <Text style={styles.calorieText}>Articles</Text>
                </LinearGradient>
                </View>
                <View >
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
                style={styles.childContainer}
                >
                    <Text style={styles.calorieText}>FAQs</Text>
                </LinearGradient>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        width:350,
        height: 350,
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
    scontainer: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    },
    itemContainer: {
       margin: 10,
       padding: 10,
       borderWidth: 1,
       borderColor: 'gray'
    },
    homeScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
    container:{
        // backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        marginHorizontal: 15,
        marginVertical: 20,
    },
    helloText:{
        alignSelf: 'flex-start',
        fontSize: 40,
        marginBottom: 50,
        color: '#FFFFFF',
        fontWeight: '600',  
    },
    childText:{
        alignSelf: 'flex-start',
        fontSize: 25,
        marginLeft: 15,
        color: '#333333',
        fontWeight: '600',  
    },
    childContainer:{
        // backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 25,
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 15,
        flexDirection: 'row',
    },
    calorieChild:{
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
    },
    calorieText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    calorieText1:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ff99',
    },
    calorieText2:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff1a00',
    },

})

export default HomeScreen