import { Sequelize } from 'sequelize';

import sequelize from '../utils/database.js';

const Diet = sequelize.define('diet', {
    diet_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true,
    },
    user_id:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    type:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    calorie:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    burned_calorie:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
})

export default Diet;