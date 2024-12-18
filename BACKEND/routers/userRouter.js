const express = require('express')
const userRouter = express.Router()
const User = require('../models/userModel.js')
const passport = require('passport')

const {registerUser,loginUser,logOut} = require("../controllers/userController.js")

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

userRouter.post("/signup",registerUser)
userRouter.post("/login",
    passport.authenticate("local",{ failureRedirect: "/login", failureFlash: true }),
    loginUser)
    
userRouter.get("/logout",logOut)

module.exports = userRouter;


