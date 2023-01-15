import express from 'express';

import sequelize from './utils/database.js';

import router from './routes/routes.js';

// import cookieParser from 'cookie-parser';

import session from 'express-session';

import RedisStore from 'connect-redis';

import {createClient} from 'redis';

const app = express();

const redisClient = createClient();
// const client = createClient();

// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('key', 'value');
// const value = await client.get('key');
// await client.disconnect();
redisClient.connect().catch(console.error)

// const cookieParser = cookie-parser();
// const sessions = express-session(); 
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(session({
    store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 260
  }),
    name:'test',
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    // cookie: { 
    //     maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
// app.use(express.static(__dirname));

// cookie parser middleware
// app.use(cookieParser());

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
