const mongoose=require("mongoose")
const validater= require("validator")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true,validate(val){
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
    }},
    avatar:{type:String}
},{timestamps:true})

userSchema.pre("save",async function(next){
    let user=this
    user.password=await bcrypt.hash(user.password,8)
    next()

})

userSchema.pre("findOneAndUpdate",async function(next){
    let user=this.getUpdate()
   if(user.password){
    user.password=await bcrypt.hash(user.password,8)

   }
    
    next()
})

userSchema.virtual("mytasks",{
    ref:'tasks',
    localField:'_id',
    foreignField:'ownerID'
})

userSchema.set("toJSON", { virtuals: true });

const userModel=mongoose.model("users",userSchema)

module.exports=userModel