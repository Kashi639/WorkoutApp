import React,{useState, useEffect}from 'react';
import {View, Text, StyleSheet,ScrollView, SafeAreaView,Pressable,FlatList,TouchableOpacity} from 'react-native';
import CustomPressTwo from '../../components/CustomPressTwo';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage'

const WorkoutScreen = ({route})=>{
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState('');
    useEffect(()=>{
        // const workoutname = route.params?.workoutname;
        fetch('http://localhost:3000/workouts/flatlist')
        .then(response => {
          setWorkouts(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  const renderItem = ({ item }) => {
    if(!item) return null;
    return (
  <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'red'}]} onPress={() => alert(item.title)}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
    )
  };

    // const ListItem=({title})=>{
    //     return (
    //         <Pressable        //<<<<<<<<<<<
    //         onPress={onWorkoutPressed} >
    //         <View style={styles.container}>
    //         <Text style={styles.text}>{title}</Text>
    //         <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'red'}]} onPress={()=>deleteWorkouts(workouts?.id)}>
    //         <Icon name="delete" size={20} color={'white'} />
    //         </TouchableOpacity>
    //         </View>
    //         </Pressable>
    //     )
    // };
    const navigation = useNavigation();
    //const {workoutname, submit} = route.params;
    const onHybridWorkoutPressed =()=>{
        navigation.navigate('DynamicWorkout',{id:1});
    }
    var onHITWorkoutPressed =()=>{
        navigation.navigate('DynamicWorkout',{id:2});
    }
    const onAddPressed =()=>{
        navigation.navigate('CustomForm');
    }
    const onWorkoutPressed =()=>{
        console.warn('new workout')
    }

     const deleteWorkouts = (workoutsId) => {
        const newWorkouts = workouts.filter(item => item.id != workoutsId)
        setWorkouts(newWorkouts)
      }

    return(
        <ScrollView horizontal={false} style={{flex: 1, backgroundColor: 'white'}}>
        <CustomPressTwo
        text={"Hybrid Workout"} 
        onPress={onHybridWorkoutPressed}/>
        <CustomPressTwo
        text={"HIT Workout"} 
        onPress={onHITWorkoutPressed}/>
        <CustomPressTwo
        text={"Add your own Workout Routine"} 
        onPress={onAddPressed}/>
        <ScrollView horizontal={true} style={{flex:1, flexDirection:'column'}}>
        {/* error ? <Text>Error: {error.message}</Text> : */}
        
        <FlatList
        data={workouts}
        keyExtractor={item => item.workout_id.toString()}
        renderItem={({ item }) => <WorkoutItem workout={item} />}
        />
        
        </ScrollView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    workoutScreen:{
        backgroundColor: "#FFFF",
        flex: 1,
    },
    container:{
        flex:1,
        backgroundColor: '#536DFE',
        // width: '90%',
        borderWidth: 0,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 40,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        flexDirection: 'row',
        color:'#536DFE'
    },
    text:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFF',
    },
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: '#536DFE',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 3,
      },
})

export default WorkoutScreen