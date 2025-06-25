const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({
    description:{type:String,required:true,trim:true},
    completed:{type:Boolean}
})

const taskModel=mongoose.model("tasks",taskSchema)

module.exports=taskModel