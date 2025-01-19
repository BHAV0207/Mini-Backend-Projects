const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


router.post('/register' ,async (req, res) => {
  const {name , email ,password } = req.body;

  try{
    const existingUser = await User.findOne({email});
    if(existingUser) res.status(404).json({message: 'user already exist, please login'})
      
    const salt =await  bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password , salt);

    const newUser = new User({
      name,
      email,
      password : hashedPass
    })


    await newUser.save();
    
    res.status(201).json({message : "user registered"})
  }catch(err){
    res.status(500).json({message : "regestration failed"})
  }
})

router.post('/login' , async(req,res) => {
  const {email , password} = req.body;

  try{
    const existingUser = await User.findOne({email})
    if(!existingUser) res.status(404).json({message: 'user not found, please register'})

    const pass = bcrypt.compare(existingUser.password , password);
    if (!pass) res.status(400).json({ message: "incorrect password" });

    const token = jwt.sign(
     {id : existingUser._id},
     process.env.JWT_SECRET,
     {expiresIn :"7d"}
    )

    res.status(201).json({
      token,
      id : existingUser.id,
    })

  }catch(err){
    res.status(500).json({ message: "server error" });
  }
})


module.exports = router;
