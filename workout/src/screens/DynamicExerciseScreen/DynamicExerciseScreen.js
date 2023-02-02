import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Video from 'react-native-video';
//import Vid1 from '../../../assets/videos/Pushups.mp4';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const DynamicExerciseScreen =({route})=>{
    const {id} = route.params;
    const Vid1=require('../../../assets/videos/Pushups.mp4')
    const Vid2=require('../../../assets/videos/Pullups.mp4')
    const Vid3=require('../../../assets/videos/Squats.mp4')
    const Vid4=require('../../../assets/videos/LegRaises.mp4')
    const Vid5=require('../../../assets/videos/Bridges.mp4')
    const Vid6=require('../../../assets/videos/Twists.mp4')
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
            titleText="Full Pushups"
            text="1. Kneel on the floor with your knees together.\n2. Lean forward and place your hands on the ground. Straighten your knees. Your arms should be straight and your body aligned from your head to knees.\n3. Descend slowly until your chest gently touches the floor. Your hands may brush your chest.\n4. Pause for 1 Second.\n5. Slowly come back up.\n6. Pause for 1 Second.\n7. Repeat"
            standards="LEVEL 1: 2 Sets of 5\nLEVEL 2: 2 Sets of 15\nLEVEL 3: 3 Sets of 25"
            Vid=Vid1
            break;
        case 2:
            titleText="Full Pullups"
            text="1. Stand below a horizontal bar or rings.\n2. Firmly grasp the bar with both arms at shoulder width. Your entire body should be straight and off the ground.\n3. Ascend slowly until your chest gently touches the bar (or just below).\n4. Pause for 1 Second.\n5. Slowly come back down.\n6. Pause for 1 Second.\n7. Repeat 3-6."
            standards="LEVEL 1: 1 Set of 3\nLEVEL 2: 2 Sets of 6\nLEVEL 3: 3 Sets of 12"
            Vid=Vid2
            break;
        case 3:
            titleText="Full Squats"
            text="1. Stand in a safe area with your feet shoulder width apart.\n2. Place your arms wherever they feel comfortable. Some extend their arms straight in front of them, and others place them across their chest.\n3. Squat down slowly until your hamstrings are pressed against your calves and you are unable to descend any further.\n4. Pause for 1 Second.\n5. Slowly come back up.\n6. Pause for 1 Second.\n 7.Repeat 3-6."
            standards="LEVEL 1: 2 Sets of 10\nLEVEL 2: 2 Sets of 20\nLEVEL 3: 2 Sets of 30"
            Vid=Vid3
            break;
        case 4:
            titleText="Full Leg Raises"
            text="1. Lie flat on the floor with your arms by your side.\n2. Maintaining straight legs, bring your legs up until your knees are over your waist. Control the movement.\n3. Pause for 1 Second, feeling the contraction in your hips and abs.\n4. Slowly descend, maintaining straight legs until your heels are 1 inch off the ground.\n5. Pause for 1 Second.\n6. Repeat  3-5."
            standards="LEVEL 1: 2 Sets of 5\nLEVEL 2: 2 Sets of 15\nLEVEL 3: 2 Sets of 25"
            Vid=Vid4
            break;
        case 5:
            titleText="Full Bridge"
            text="1. Lie on your back with your knees bent. Your heels should be a few inches away from your butt.\n2. Reach back until your palms touch the floor. Your hands should be next to your head with your fingers pointing towards your feet.\n3. Push through your palms and feet while arching your back until your arms and legs are as straight as you can make them. You should be in a Full Bridge position - supported only be your palms and feet!\n4. Pause for 5 Seconds. Breathing evenly and feeling your muscles stretch.\n5. Slowly reverse the movement.\n6. Pause for 5 Seconds.\n7. Repeat 3-6."
            standards="LEVEL 1: 2 Sets of 5\nLEVEL 2: 2 Sets of 10\nLEVEL 3: 2 Sets of 15"
            Vid=Vid5
            break;
        case 6:
            titleText="Twists"
            text="1. Sit on the floor with your legs straight in front of you.\n2. Place your right foot beside your left knee and cross it over so the foot is on the other side of the knee to your left.\n3. Bend your left knee and place your left heel on your right buttcheek.\n4. Turn slowly towards your bent leg.\n5. Thread your left arm under your right knee from the outside.\n6. Turn a bit more towards the right until you are able to grab your left hand with your right hand.\n7. Hold your hands together while turning as hard as you safely can to the right side.\n8. Breathe normally and hold for time.\n9. Return to your starting position and do the exact same for the left side.\n10. After doing both sides, rest 30 seconds before repeating again. See Standards."
            standards="LEVEL 1: 3 Holds of 15 Seconds (Both Sides)\nLEVEL 2: 3 Holds of 30 Seconds (Both Sides)\nLEVEL 3: 3 Holds of 60 Seconds (Both Sides)"
            Vid=Vid6
            break;

        default:
            break;
    }

    return(
        <ScrollView style={styles.dynamicexerciseScreen}>
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
            <View>
                <Text style={styles.titletextStyle}>{titleText}</Text>
            </View>
            <View style= {fullScreen ?  styles.fullscreenVideo : styles.video }>
            <VideoPlayer
             fullscreen = {fullScreen}
             source={Vid}
             controls={false}
             disableVolume={true}
             resizeMode={'cover'}
             disableBack={true}
             style={{...StyleSheet.absoluteFill}}
             ref={(ref) => {
             this.player = ref
            }} />
            </View>
            <View style={{paddingVertical:20}}>
                <Text style={styles.textStyle1}>Tutorial</Text>
                <View style={{paddingTop:10}}><Text style={styles.textStyle}>{text}</Text></View>
            </View>
            <View style={{paddingBottom:20}}>
                <Text style={styles.textStyle1}>Standards</Text>
                <View style={{paddingTop:10}}><Text style={styles.textStyle2}>{standards}</Text></View>
                <View style={{paddingTop:10}}><Text style={styles.textStyle}>Do 2-3 Sets of as many as you can. The levels above are standards you can use to measure your progress. Rest 2-3 minutes between Sets.</Text></View>
            </View>
            </LinearGradient>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dynamicexerciseScreen:{
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
    titletextStyle:{
        alignSelf: 'flex-start',
        fontSize: 40,
        marginBottom: 50,
        color: '#FFFF',
        fontWeight: '600',  
    },
    textStyle1:{
        color: "#ffff",
        fontSize: 30,
        fontWeight:'bold'
    },
    textStyle2:{
        color: "#ffff",
        fontSize: 20,
        fontWeight:'bold'
    },
    textStyle:{
        color: "#ffff",
        fontSize: 20,
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

export default DynamicExerciseScreen