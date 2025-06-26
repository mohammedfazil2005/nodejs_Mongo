const mongoose=require("mongoose")

mongoose.connect(process.env.MONGODBSTRING).then((res)=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(err)
})