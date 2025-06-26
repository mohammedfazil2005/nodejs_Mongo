const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    description:{type:String,required:true,trim:true},
    completed:{type:Boolean,default:false},
    ownerID:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'users'},

},{timestamps:true})

const taskModel=mongoose.model("tasks",taskSchema)

module.exports=taskModel