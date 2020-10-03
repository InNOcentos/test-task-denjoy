'use strict';

const {Router} = require('express');
const {authenticate,alreadyRegister} = require('../middlewares');
const {userStore,sessionStore} = require('../stores');
const {nanoid} = require('nanoid');
const path = require('path');

const userRouter = new Router();

userRouter.get('/register', alreadyRegister(userStore), (req,res) => {
    try {
        return res.sendFile(path.resolve(__dirname,'../../public/register.html'));
    }catch (err) {
        return console.log(err.message);
    }
})
userRouter.post('/register', alreadyRegister(userStore), (req,res) => {
    try {
        const {username, password} = req.body;
        userStore.add(username, password);
        
        return res.redirect('login');
    }catch (err) {
        return console.log(err.message);
    }
})

userRouter.get('/login', (req,res) => {
    try {
        return res.sendFile(path.resolve(__dirname,'../../public/login.html'));
    }catch(err){
        return console.log(err.message);
    }
})

userRouter.post('/login', authenticate(userStore), (req,res) => {
    try {
        const {username, password} = req.body;
        const id = nanoid(6);
        sessionStore.setUser(id, {username, password});

        return res.cookie(`sid`, `${id}`, { expires: new Date(Date.now() + 3600 * 48 * 1000), httpOnly: true }).redirect(`/`);
    }catch(err){
        return console.log(err.message);
    }
})

module.exports = userRouter;