import React,{useState,useEffect} from 'react';
import{View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomSchedule from '../../components/CustomSchedule';

// const API_URL = Platform.OS === 'android' ? 'http://localhost:3000' : 'http://192.168.2.143:3000';

const HomeScreen =()=>{
    const [name, setName] = useState('');
    const [inputCalorie, setInputCalorie] = useState(0);
    const [outputCalorie, setOutputCalorie] = useState(0);
    const [left, setLeft] = useState(0);

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
        console.warn('Monday')
    }
    return(
        <ScrollView style={styles.homeScreen}>
            <View style={styles.container}>
            <Text style={styles.helloText} user={this.user}>Hello {name}</Text>
            </View>
            <View>
                <Text style={styles.childText}>Schedule</Text>
                <View style={styles.childContainer}>
                <CustomSchedule
                text={"M"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"T"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"W"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"T"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"F"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"S"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"S"} 
                onPress={onMPressed}/>
                </View>
            </View>    
            <View>
                <Text style={styles.childText}>Goals</Text>
                <View style={styles.childContainer}>
                <CustomSchedule
                text={"Gain muscle"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"Gain strength"} 
                onPress={onMPressed}/>
                <CustomSchedule
                text={"Lose fat"} 
                onPress={onMPressed}/>
                </View>
            </View>
            <View>
                <Text style={styles.childText}>Calories Burnt</Text>
                <View style={styles.childContainer}>
                        <View style={styles.calorieChild}>
                            <Text style={styles.calorieText}>Eaten:</Text>
                            <Text style={styles.calorieText}>{inputCalorie}</Text>
                        </View>
                        <View style={styles.calorieChild}>
                            <Text style={styles.calorieText}>Burnt:</Text>
                            <Text style={styles.calorieText}>{outputCalorie}</Text>
                        </View>
                        <View style={styles.calorieChild}>
                            <Text style={styles.calorieText}>Left:</Text>
                            <Text style={styles.calorieText}>{left}</Text>
                    </View>

                </View>
            </View>
            <View>
                <Text style={styles.childText}>Explore more</Text>
                <View style={styles.childContainer}>
                    <Text style={styles.calorieText}>Articles</Text>
                </View>
                <View style={styles.childContainer}>
                    <Text style={styles.calorieText}>FAQs</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    homeScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
    container:{
        backgroundColor: '#536DFE',
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
        color: '#FFFF',
        fontWeight: '600',  
    },
    childText:{
        alignSelf: 'flex-start',
        fontSize: 25,
        marginLeft: 15,
        color: '#536DFE',
        fontWeight: '600',  
    },
    childContainer:{
        backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
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
        color: '#FFFF',
    },
})

export default HomeScreen