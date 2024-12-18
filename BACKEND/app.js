if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const cors = require('cors')
const userRouter = require("./routers/userRouter.js")
const User = require("./models/userModel.js")


const dburl =process.env.DB_URL
main()
.then(()=>{
    console.log("Connected to the db Successfully")
})
.catch((err)=>{
    console.log("Error occurred!!")
})

async function main() {
    await mongoose.connect(dburl)
}

const sessionOptions = {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        SameSite:'lax'
    }
}

app.use(cors( {
        origin: true, 
        credentials: true,  
}))

app.use(session(sessionOptions));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/api",userRouter)

app.get("/home",(req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.user)
    }
    console.log(req.user)
    res.send("Welcome to home page")
})
app.listen(8080,(req,res)=>{
    console.log("Listening on port 8080")
})