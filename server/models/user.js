import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

// import Workout from './workout.js';

const User = sequelize.define('users', {
   id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

// User.hasOne(Workout);
// Workout.belongsTo(User);

export default User;