'use strict';

const express = require('express');
const app = express();
const path = require('path')
const userRouter = require('./rotues/user-routes');
const mainRouter = require('./rotues/main-routes');
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/',mainRouter)
app.use('/',userRouter)

app.use(express.static(path.resolve(__dirname,`../public/`)))

app.use((req,res,next)=> {
    return res.status(404).redirect('/login');
})


app.listen(process.env.PORT || PORT);

