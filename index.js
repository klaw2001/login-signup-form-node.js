const express = require('express')
const loginCollection = require('./mongo')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 5000;
app.use(express.json())


app.use(express.urlencoded({extended:false}))

const templatePath = path.join(__dirname , './public')
app.set('view engine','hbs')
app.set('views',templatePath)
// app.use(expresss.static(templatePath))



app.get("/signup",(req,res)=>{
    res.render('signup')
})
app.get("/",(req,res)=>{
    res.render('login')
})

app.post('/signup', async (req,res)=>{
    const data ={
        name:req.body.name,
        password:req.body.password,
        firstname:req.body.firstname
    }

    const check = await loginCollection.findOne({name:req.body.name})

    await loginCollection.insertMany([data])
    res.render("login")
})


app.post('/login',async (req,res)=>{
    try{

        const check = await loginCollection.findOne({name:req.body.name})

        if(check.password === req.body.password){
            res.render('home')
        }
        else{
            res.send("incorrect password")
        }
    }
    catch{
        res.send("wrong credentials")
    }
})












app.listen(PORT,()=>{
    console.log("port connected")
})
