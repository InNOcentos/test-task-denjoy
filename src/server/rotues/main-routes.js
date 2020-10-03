"use strict";

const { Router } = require("express");
const {privateRoute} = require("../middlewares");
const {uploadFile} = require("../multer/multer")
const path = require("path");

const mainRouter = new Router();

mainRouter.get("/", privateRoute, (req, res) => {
  try {
    return res
      .cookie(`sid`, `${res.locals.user.id}`, {
        expires: new Date(Date.now() + 3600 * 48 * 1000),
        httpOnly: true,
      })
      .sendFile(path.resolve(__dirname, "../../public/index.html"));
  } catch (err) {
    return console.log(err.message);
  }
});

mainRouter.post("/", privateRoute, uploadFile, (req, res) => {
  try {
    return res.cookie(`sid`, `${res.locals.user.id}`, {
        expires: new Date(Date.now() + 3600 * 48 * 1000),
        httpOnly: true,
      }).redirect(`/getFile`);
  } catch (err) {
    return console.log(err.message);
  }
});

mainRouter.get("/getFile", privateRoute, (req, res) => {
  try {
    return res.cookie(`sid`, `${res.locals.user.id}`, {
        expires: new Date(Date.now() + 3600 * 48 * 1000),
        httpOnly: true,
      }).sendFile(path.resolve(__dirname, "../../public/getFile.html"));
  } catch (err) {
    return console.log(err.message);
  }
});

mainRouter.post("/getFile", privateRoute, (req, res) => {
  try {
    const { picture } = req.body;

    return res.cookie(`sid`, `${res.locals.user.id}`, {
        expires: new Date(Date.now() + 3600 * 48 * 1000),
        httpOnly: true,
      }).download(`src/public/images/${picture}`);
  } catch (err) {
    return console.log(err.message);
  }
});

mainRouter.get('/logout', privateRoute, (req,res) => {
    try {
        return res.clearCookie('sid').redirect('back');
    }catch(err){
        return console.log(err.message);
    }
})

module.exports = mainRouter;
