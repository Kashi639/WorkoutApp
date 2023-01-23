import User from '../models/user.js';
import Workout from '../models/workout.js';
import Diet from '../models/diet.js';
import sequelize from '../utils/database.js';


const form =(req,res,next)=>{
    if(!req.body.workout_name && !req.body.day && !req.body.exercise1 && !req.body.exercise2 && !req.body.e1r1 && !req.body.e1r2 && !req.body.e1r3 && !req.body.e2r1 && !req.body.e2r2 && !req.body.e2r3){
        return res.status(400).json({message: "Please enter all Details"});
    }  else if (req.body.workout_name && req.body.day && req.body.exercise1 && req.body.exercise2 && req.body.e1r1 && req.body.e1r2 && req.body.e1r3 && req.body.e2r1 && req.body.e2r2 && req.body.e2r3){
         return Workout.create({
            user_id:req.session.name,
            workout_name:req.body.workout_name,
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
        res.status(200).json({message: "Workout created"});
    })
    .catch(err => {
        console.log(err);
        res.status(502).json({message: "Error while creating the workout"});
    });
}
}

const workout= (req, res, next) => {
    Workout.findAll({
      where: {
        user_id: req.session.name,
        workout_name: req.params.workoutname
      }
    })
    .then(workout => {
        if (workout.length === 0) {
          res.status(404).send('Workout not found');
        } else {
          const workoutArray = workout.map(workout => ({ id: workout.workout_id, title: workout.workout_name }));
          res.send(workoutArray);
          console.log(user_id);
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
    }

export {form, workout}