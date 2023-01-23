import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('workoutdb', 'root', 'outlast2k15', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;