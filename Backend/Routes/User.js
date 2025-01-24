const express = require("express");
const router = express.Router();
const User = require("../Models/User");


router.get('/:id' , async(req, res) => {
  const {id} = req.params;

  try{
    const existingUser = await User.findById(id);
    if(!existingUser){
      return res.status(404).json({message : "the user does not exist"});
    }

    res.status(200).json(existingUser);
  }catch(err){
    return res.status(500).json({message : "internal server error"});
  }
})


module.exports = router;