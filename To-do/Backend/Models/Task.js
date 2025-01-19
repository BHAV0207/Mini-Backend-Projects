const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
  taskTitle : {type : String , required :true},
  taskDescription : {type :String  , max : 100},
  priority : {type : String , enum:[low , high] ,  default:"low"},
  userId : {type : mongoose.Schema.Types.ObjectId , ref:"User" , required:true}
},
{timestamps : true})

module.exports = mongoose.model("Task" , taskSchema);