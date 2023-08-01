const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const User = require('./models/user');
const cors = require('cors');
dotenv.config();
const jwt = require('jsonwebtoken')

const mongoURl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const clientURL = process.env.CLIENT_URL

//console.log(mongoURl);
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: clientURL,
}))


mongoose.connect(mongoURl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.get('/test',(req,res)=>{

    res.json("test ok")
    //console.log("working");

})


app.post('/register',async (req,res)=>{
  try{
    const {username,password}= req.body;
    const createdUser = await User.create({username,password});
    jwt.sign({userId: createdUser._id,username},jwtSecret,{},(err,token)=>{
      if(err) throw err;
      res.cookie('token',token,{sameSite:'none',secure:true}).status(201).json({
        id : createdUser._id,
      });
  
    })
  }catch(err){
    if(err) throw err;
  }
})

app.get('/profile', (req,res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json('no token');
  }
});

app.listen(4040,()=>{
    console.log("server is running");
});     

// IoTgz2S390yx2F2I
// mbIqwCUDaInpd2sR