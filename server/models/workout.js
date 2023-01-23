import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Workout = sequelize.define('workout', {
   workout_id:{
       type: Sequelize.INTEGER,
       autoIncrement: true,      // to be set false in future
       allowNull: false,
       primaryKey: true,         // to be set false in future
   },
   user_id:{
      type: Sequelize.STRING,
      allowNull: false,
   },
   workout_name: {
      type: Sequelize.STRING,
   },
   day: {
      type: Sequelize.STRING,
   },
   exercise1: {
      type: Sequelize.STRING,
   },
   exercise2: {
       type: Sequelize.STRING,
    },
    e1r1: {
       type: Sequelize.INTEGER,
    },
    e1r2: {
       type: Sequelize.INTEGER,
    },
    e1r3: {
       type: Sequelize.INTEGER,
    },
    e2r1: {
       type: Sequelize.INTEGER,
    },
    e2r2: {
       type: Sequelize.INTEGER,
    },
    e2r3: {
       type: Sequelize.INTEGER,
    },
    createdAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE
     }
});

export default Workout;


 
 