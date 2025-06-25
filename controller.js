const taskSchema=require('./taskModel')
const userSchema=require('./userModel')

exports.newUser=async(req,res)=>{
    try {
        const newUser=new userSchema(req.body)
        await newUser.save()
         res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
   
}

exports.newTask=async(req,res)=>{
 try {
        const newTask=new taskSchema(req.body)
        await newTask.save()
         res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.fetchUsers=async(req,res)=>{
   try {
    const users=await userSchema.find()
    res.status(200).json(users)
   } catch (error) {
    res.status(500).json(error)
   }
}


exports.fetchOneUser=async(req,res)=>{
   try {
    const user=await userSchema.findOne({_id:req.params.id})
    res.status(200).json(user)
   } catch (error) {
    res.status(500).json(error)
   }
}

exports.fetchTasks=async(req,res)=>{
   try {
    const tasks=await taskSchema.find()
    res.status(200).json(tasks)
   } catch (error) {
    res.status(500).json(error)
   }
}


exports.fetchOneTask=async(req,res)=>{
      try {
    const task=await taskSchema.findOne({_id:req.params.id})
    res.status(200).json(task)
   } catch (error) {
    res.status(500).json(error)
   }
}


exports.updateUser=async(req,res)=>{
    let id=req.params.id
    try {
        const updateUser=await userSchema.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateUser){
          return  res.status(400).json("Not found!")
        }

        res.status(200).json(updateUser)

    } catch (error) {
        res.status(500).json(error)
    }
}



exports.updateTasks=async(req,res)=>{
    let id=req.params.id

    try {
        const updateTasks=await taskSchema.findByIdAndUpdate(id,req.body,{new:true})
        console.log(updateTasks)
        if(!updateTasks){
          return  res.status(400).json("Not found!")
        }

        res.status(200).json(updateTasks)

    } catch (error) {
        res.status(500).json(error)
    }
}


exports.deleteUser=async(req,res)=>{
    try {
        const deleteUser=await userSchema.deleteOne(req.params.id)
        if(!deleteUser){
            return res.status(404).json("User not found")
        }

        res.status(200).json(deleteUser)

        
    } catch (error) {
        res.status(500).json(error)
    }
}



exports.deleteTask=async(req,res)=>{
    try {
        const deleteTask=await taskSchema.deleteOne(req.params.id)
        if(!deleteTask){
            return res.status(404).json("User not found")
        }

        res.status(200).json(deleteTask)

        
    } catch (error) {
        res.status(500).json(error)
    }
}


