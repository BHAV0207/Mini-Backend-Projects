const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
  taskDescription : {type :String  , max : 100 , required:true},
  priority : {type : String , enum:["low" , "high"] ,  default:"low"},
  status : {type :String , enum:["completed" , "notCompleted"] , default:"notCompleted"},
  userId : {type : mongoose.Schema.Types.ObjectId , ref:"User" , required:true}
},
{timestamps : true})

module.exports = mongoose.model("Task" , taskSchema);