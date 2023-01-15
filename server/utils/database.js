import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('workoutdb', 'root', 'null', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;