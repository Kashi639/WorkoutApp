import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {QueryTypes} from 'sequelize';

import User from '../models/user.js';
import Workout from '../models/workout.js';
import Diet from '../models/diet.js';
import sequelize from '../utils/database.js';
import { Sequelize } from 'sequelize';

import { signup, login, isAuth, signout } from '../controllers/auth.js';
import { userData } from '../controllers/users.js';
import { form, workout } from '../controllers/workout_form.js'


const router = express.Router();

// SIGN UP
router.post('/signup', (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {  //
        name: req.body.name,  //
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message:"username already exists"});    
        } 
        else if (req.body.email && req.body.name &&  req.body.password) {   
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        id: Date.now(),
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        } else if (!req.body.name) {                                       //
            return res.status(400).json({message: "name not provided"});   //
        };                                                                 //
    })
    .catch(err => {
        console.log('error', err);
    });
});

// LOGIN
router.post('/login', (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {   //
        name: req.body.name,   //
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { 
                    // password match
                    const token = jwt.sign({ name: req.body.name }, 'secret', { expiresIn: '1h' });     //
                    const sessName= req.body.name;
                    req.session.name=sessName;
                    // const sessName=req.session;
                    // sessName.token=req.body.name;
                    res.status(200).json({message: "user logged in", "token": token});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
});

router.get('/session', (req,res,next)=>{
    if (req.session.name) {
      res.json({name: req.session.name})
    } else {
      res.json({name: null});
    }
})

router.get('/private', (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: `here is your resource ${req.session.name}` });
    };
});

router.get('/userData', userData);

router.post('/sohan', (req,res,next)=>{
    if (req.body.name && req.body.password) {
        const sessName= req.body.name;
        req.session.name=sessName;
        res.status(404).json({message: 'success'})
    } else {
        res.status.json({message: 'not found'})
    }
})

router.post('/form', form);

router.get('/workouts/:workoutname', workout)

router.post('/workouts/form', (req,res,next)=>{
    if(!req.body.workout_name && !req.body.day && !req.body.exercise1 && !req.body.exercise2 && !req.body.e1r1 && !req.body.e1r2 && !req.body.e1r3 && !req.body.e2r1 && !req.body.e2r2 && !req.body.e2r3){
        return res.status(400).json({message: "Please enter all Details"});
    } else {
        Workout.findAll({
            
        })
    }
})

router.delete('/account', async (req,res,next)=>{
    try {
        const user = await User.findOne({ where: { name: req.session.name } });
        await user.destroy();
        res.json({ message: 'Your account has been deleted.' });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred while deleting your account.' });
    }
});

router.get('/signout', (req,res,next)=>{
    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(400).json({message:'Unable to log out'})
          } else {
            res.status(200).json({message:'Logout successful'})
          }
        });
      } else {
        res.end()
      }
})

router.post('/insert', (req,res,next)=>{
    let workout_id=1;
    if(!req.body.workout_name && !req.body.day && !req.body.exercise1 && !req.body.exercise2 && !req.body.e1r1 && !req.body.e1r2 && !req.body.e1r3 && !req.body.e2r1 && !req.body.e2r2 && !req.body.e2r3){
        return res.status(400).json({message: "Please enter all Deatils"});
    }
    const workout_name=req.body.workout_name;
    Workout.findAll({
        where:{workout_name: req.body.workout_name},
        order:[['workout_name', 'DESC']]
    }).then(existingWorkout =>{
         if(existingWorkout){
            workout_id=existingWorkout.workout_id;
            Workout.create({
                workout_id:workout_id,
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
                res.status(502).json({message: "error while creating the workout"});
            });
           }
    }
    )
})

router.post('/diet', (req,res,next)=>{
    if(req.body.calorie== null){
    return res.status(400).json({message: "Please enter all Details"});
    } else {
        Diet.findOne({
            where:{
                user_id:req.session.name,
                type:req.body.type
            }
        }).then(dbDiet =>{
            if(!dbDiet) {
                return Diet.create({
                    user_id:req.session.name,
                    type:req.body.type,
                    calorie:req.body.calorie,
                }).then(() => {
                    res.status(200).json({message: "Calories Added"});
                }).catch(err => {
                    console.log(err);
                    res.status(502).json({message: "Error while adding calories! Please try again."});
                });
            } else {
                return Diet.update({calorie: req.body.calorie},{
                       where:{
                        user_id: req.session.name,
                        type:req.body.type
                    }
                }).then(() => {
                    res.status(200).json({message: "Calories Updated"});
                }).catch(err => {
                    console.log(err);
                    res.status(502).json({message: "Error while updating calories! Please try again."});
                });
            }
        })     
    }
})

router.post('/diet/burned', (req,res,next)=>{
    if(req.body.burned_calorie == null){
    return res.status(400).json({message: "Please enter all Details"});
    } else {
        Diet.findOne({
            where:{
                user_id:req.session.name,
                type:req.body.type
            }
        }).then(dbDiet =>{
            if(!dbDiet) {
                return Diet.create({
                user_id:req.session.name,
                type:req.body.type,
                burned_calorie:req.body.burned_calorie,
             }).then(() => {
               res.status(200).json({message: "Burned Calories Added"});
             })
             .catch(err => {
               console.log(err);
               res.status(502).json({message: "Error while adding calories! Please try again."});
             });
            } else {
                return Diet.update({burned_calorie: req.body.burned_calorie},{
                    where:{
                     user_id: req.session.name,
                     type:req.body.type
                 }
             }).then(() => {
                 res.status(200).json({message: "Burned Calories Updated"});
             }).catch(err => {
                 console.log(err);
                 res.status(502).json({message: "Error while updating calories! Please try again."});
             });
            }
        })     
    }
})

router.delete('/diet/delete/:type',async (req,res,next)=>{
    try {
        await Diet.destroy({ where: { user_id: req.session.name, type:req.params.type } });
        
        res.json({ message: 'Calories cleared' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'An error occurred while clearing calories.' });
    }
})

router.get('/diet/sum/', async (req,res,next)=>{
    try{
        const inputCalorie = await Diet.sum('calorie', { where: { user_id: req.session.name} });
          res.json({ inputCalorie });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/diet/sum/burned', async (req,res,next)=>{
    try{
        const outputCalorie = await Diet.sum('burned_calorie', { where: { user_id: req.session.name} });
          res.json({ outputCalorie });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.delete('/diet/delete/At12', async (req, res) => {
    try {    
      await Diet.destroy({
        truncate:true
        // where: {
        //   user_id: req.session.name,
        //   calorie: {
        //     [Sequelize.Op.ne]: null
        //   },
        //   burned_calorie: {
        //     [Sequelize.Op.ne]: null
        //   }
        // }
      })
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting data', error });
    }
  });
  

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// SHOULD BE PLACED AT THE BOTTOM OF THE ROUTES.JS FILE,
// ELSE WILL SHOW page not found
// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : `page not found`});
});



export default router;