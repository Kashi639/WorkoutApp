import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const DynamicWorkoutScreen =({route})=>{
    const {id} = route.params;
    const Vid1=require('../../../assets/videos/Pushups.mp4')
    const Vid2=require('../../../assets/videos/Pullups.mp4')
    const Vid3=require('../../../assets/videos/Squats.mp4')
    const Vid4=require('../../../assets/videos/LegRaises.mp4')
    // const Vid5=require('../../../assets/videos/Bridges.mp4')
    // const Vid6=require('../../../assets/videos/Twists.mp4')
    const [fullScreen, setFullScreen] = useState(false);
    const FullScreen = () => {
        if(fullScreen){
            Orientation.lockToPortrait();
        } else{
            Orientation.lockToLandscape();
        }
        setFullScreen(!fullScreen)
    }
    const navigation = useNavigation();

    switch (id) {
        case 1:
            day1="Monday"
            titleText="Full Pushups"
            text="1. Kneel on the floor with your knees together.\n2. Lean forward and place your hands on the ground. Straighten your knees. Your arms should be straight and your body aligned from your head to knees.\n3. Descend slowly until your chest gently touches the floor. Your hands may brush your chest.\n4. Pause for 1 Second.\n5. Slowly come back up.\n6. Pause for 1 Second.\n7. Repeat"
            vidOne=Vid1
            day2="Tuesday"
            titleText2="Full Pullups"
            text2="1. Stand below a horizontal bar or rings.\n2. Firmly grasp the bar with both arms at shoulder width. Your entire body should be straight and off the ground.\n3. Ascend slowly until your chest gently touches the bar (or just below).\n4. Pause for 1 Second.\n5. Slowly come back down.\n6. Pause for 1 Second.\n7. Repeat 3-6."
            vidTwo=Vid2
            break;
        case 2:
            day1="Monday"
            titleText="Full Squats"
            text="1. Stand in a safe area with your feet shoulder width apart.\n2. Place your arms wherever they feel comfortable. Some extend their arms straight in front of them, and others place them across their chest.\n3. Squat down slowly until your hamstrings are pressed against your calves and you are unable to descend any further.\n4. Pause for 1 Second.\n5. Slowly come back up.\n6. Pause for 1 Second.\n 7.Repeat 3-6."
            vidOne=Vid3
            day2="Tuesday"
            titleText2="Full Leg Raises"
            text2="1. Lie flat on the floor with your arms by your side.\n2. Maintaining straight legs, bring your legs up until your knees are over your waist. Control the movement.\n3. Pause for 1 Second, feeling the contraction in your hips and abs.\n4. Slowly descend, maintaining straight legs until your heels are 1 inch off the ground.\n5. Pause for 1 Second.\n6. Repeat  3-5."
            vidTwo=Vid4
           
           break;
        default:
            break;
    }

    return(
        <ScrollView style={styles.dynamicworkoutScreen}>
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
            <View style={{paddingTop:15}}>
                <Text style={styles.titletextStyle}>{day1}</Text>
                <Text style={styles.titletextStyle2}>{titleText}</Text>
            </View>
            <View style= {fullScreen ?  styles.fullscreenVideo : styles.video }>
            <VideoPlayer
             fullscreen = {fullScreen}
             source={vidOne}
             controls={false}
             disableVolume={true}
             resizeMode={'cover'}
             disableBack={true}
             style={{...StyleSheet.absoluteFill}}
             ref={(ref) => {
             this.player = ref
            }} />
            
            </View>
            <View>
                <Text style={styles.textStyle2}>Tutorial</Text>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
            </LinearGradient>
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
            <View style={{paddingTop:15}}>
                <Text style={styles.titletextStyle}>{day2}</Text>
                <Text style={styles.titletextStyle2}>{titleText2}</Text>
            </View>
            <View style= {fullScreen ?  styles.fullscreenVideo : styles.video }>
            <VideoPlayer
             fullscreen = {fullScreen}
             source={vidTwo}
             controls={false}
             disableVolume={true}
             resizeMode={'cover'}
             disableBack={true}
             style={{...StyleSheet.absoluteFill}}
             ref={(ref) => {
             this.player = ref
            }} />
            
            </View>
            <View>
                <Text style={styles.textStyle2}>Tutorial</Text>
                <Text style={styles.textStyle}>{text2}</Text>
            </View>
            </LinearGradient>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dynamicworkoutScreen:{
        backgroundColor: "#FFFFFF",
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
    titletextStyle:{
        alignSelf: 'flex-start',
        fontSize: 40,
        marginBottom: 30,
        color: '#FFFFff',
        fontWeight: '600',  
    },
    titletextStyle2:{
        alignSelf: 'flex-start',
        fontSize: 30,
        marginBottom: 30,
        color: '#FFFFFF',
        fontWeight: '600',  
    },
    textStyle:{
        color: "#ffffff",
        fontSize: 20,
        marginTop:10,
    },
    textStyle2:{
        color: "#ffffff",
        fontSize: 30,
        marginTop:10,
        fontWeight:'bold'
    },
    video:{
        alignItems:'center',
        width: 360, 
        height: 300,
    },
    fullscreenVideo:{
        backgroundColor: 'black',
        ...StyleSheet.absoluteFill,
        elevation: 1,     
    },
})

export default DynamicWorkoutScreen