const express = require('express');
const session = require("express-session")
const { v4: uuidv4 } = require("uuid")


const router = require('./router')

const app = express();

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

//load static assets
app.use(express.static('public'))


app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false
}))

app.use((req,res,next)=>{
    res.setHeader('Cache-Control','no-store')
    next()
})

app.use('/', router)




app.listen(port, () => { 
    console.log("Lostening to the server on http://localhost:3000") 
});