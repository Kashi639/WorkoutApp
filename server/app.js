import express from 'express';

import sequelize from './utils/database.js';

import router from './routes/routes.js';

import session from 'express-session';

import cron from 'node-cron';
import request from "request";

const app = express();

const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(session({
    name:'test',
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { 
        maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req,res,next) => {
    console.log('req.session',req.session);
    next();
});

app.use(router);

cron.schedule("0 0 * * *", () => {
    request.delete("http://localhost:3000/diet/delete/At12", (error, response, body) => {
        if (error) {
            console.log(error);
        }
    });
});

sequelize.sync(); 

const PORT = 3000;

//To catch database connection status, and server status
// sequelize
// .authenticate()
// .then(() => {
//     console.log('Connection has been established successfully.');
    
//  })
//  .catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

 app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`));
