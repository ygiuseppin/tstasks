const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PromClient = require('../utils/prom-client');

exports.userLogIn = (req, res, next) => {
    User.find({ email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            } 
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(!err && result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.SECRET || 'nosecret', 
                    {
                        expiresIn: "1h",
                    });
                    
                    // count
                    PromClient.counter('userLogin', 1, { user: req.body.email });
                    
                    return res.status(200).json({
                        message: 'Auth success',
                        userId: user._id,
                        token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.userSignUp = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({ message: 'Email exists'})
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({error: err});
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            console.log(result);
                            res.status(201).json({message:'User created'});
                        }).catch(err => {
                            res.status(500).json({error: err});
                        })
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};
/*
exports.deleteUser2 = (userId) => {
    try {
        const result = await User.remove({ _id: userId });
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
*/


exports.deleteUser = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

