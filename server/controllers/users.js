import User from '../models/user.js';
import Workout from '../models/workout.js'

const userData = (req, res, next) => {
    Workout.create({ workout_name: "XYZ", day: "Monday"  }).then((res) => {
        console.log(`Insert successful: ${res.id}`);
    })
    // if(req.session.user && req.cookies.user_sid){
    // const user = await User.findOne({username: req.session.user.username});
    // res.render('index', {user});
    // } else {
    // res.render('index');
    // }
    
    // users.every(user => user instanceof User); // true
    // res.send(JSON.stringify(users, null, 2));
//     User.findAll().then(res=>{console.log(res)
//     }).catch((error)=>{console.error('Failed to retrieve data : ', error);
// });
}

export {userData};