const mongoose=require("mongoose")
const validater= require("validator")
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,validate(val){
        if(!validater.isEmail(val)){
            throw new Error("Invalid email")
        }
    }},
    age:{type:Number,required:true,validate(val){
        if(val<0){
            throw new Error("Please enter a valid age!")
        }
    }},
    password:{type:String,required:true,trim:true,minlength:5,validate(val){
        if(val=="password"){
            throw new Error("Password not must be 'password'")
        }
    }}
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel