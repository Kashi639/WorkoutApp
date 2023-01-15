import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const signup = (req, res, next) => {
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
};

const login = (req, res, next) => {
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
                } else if (compareRes) { // password match
                    const token = jwt.sign({ name: req.body.name }, 'secret', { expiresIn: '1h' });     //
                    // const name=req.session;
                    // name.token=req.body.name;
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
};

const isAuth = (req, res, next) => {
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
        res.status(200).json({ message: `here is your resource` });
    };
};

const signout=(req,res,next)=>{
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
}

export { signup, login, isAuth, signout };