import User from '../models/user.js';
import Workout from '../models/workout.js';


const form =(req,res,next)=>{
    if(!req.body.workout_name){
        return res.status(400).json({message: "Workout Name not provided"});
    } else if(!req.body.day){
        return res.status(400).json({message: "Day not provided"});
    } else if(!req.body.exercise1){
        return res.status(400).json({message: "Exercise not selected"});
    } else if(!req.body.exercise2){
        return res.status(400).json({message: "Exercise not selected"});
    } else if(!req.body.e1r1){
        return res.status(400).json({message: "Rep not provided"});
    } else if(!req.body.e1r2){
        return res.status(400).json({message: "Rep not provided"});
    } else if(!req.body.e1r3){
        return res.status(400).json({message: "Rep not provided"});
    } else if(!req.body.e2r1){
        return res.status(400).json({message: "Rep not provided"});
    } else if(!req.body.e2r2){
        return res.status(400).json({message: "Rep not provided"});
    } else if(!req.body.e2r3){
        return res.status(400).json({message: "Rep not provided"});
    } else if (req.body.workout_name && req.body.day && req.body.exercise1 && req.body.exercise2 && req.body.e1r1 && req.body.e1r2 && req.body.e1r3 && req.body.e2r1 && req.body.e2r2 && req.body.e2r3){
         return Workout.create({
            workout_name:req.body.workout_name,
            user_id:req.session.name,
            day:req.body.day,
            exercise1:req.body.exercise1,
            exercise2:req.body.exercise2,
            e1r1:req.body.e1r1,
            e1r2:req.body.e1r2,
            e1r3:req.body.e1r3,
            e2r1:req.body.e2r1,
            e2r2:req.body.e2r2,
            e2r3:req.body.e2r3,
    }).then(() => {
        res.status(200).json({message: "workout created"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "error while creating the workout"});
    });
}
}

const workout= async (req,res,next)=>{
   try {
    const users = await Workout.findAll({ include: User });
    res.status(200).json({users})
   } catch (error) {
    res.status(500).json({msg:error})
   }
}

export {form, workout}