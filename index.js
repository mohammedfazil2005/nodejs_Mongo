const express=require("express")
const taskRouter=require('./taskRoute')
const userRoute=require('./userRoute')
const bcrypt=require('bcrypt')

require('./DB')


const app=express()

app.use(express.json())
app.use(taskRouter)
app.use(userRoute)






app.listen(3000,()=>{
    console.log("PORT running on 3000")
})
