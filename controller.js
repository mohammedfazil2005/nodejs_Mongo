const taskSchema = require('./taskModel')
const userSchema = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.newUser = async (req, res) => {
    try {
        const newUser = new userSchema(req.body)
        await newUser.save()

        const token = jwt.sign({ _id: newUser._id }, 'fazil2005')

        res.status(201).json({
            userData: {
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,

            }, token
        })
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.newTask = async (req, res) => {
    const ownerID=req.userID

    let taskDetails={...req.body,ownerID}

    try {
        const newTask = new taskSchema(taskDetails)
        await newTask.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.fetchUsers = async (req, res) => {
    const id = req.userID
    try {
        const users = await userSchema.findById(id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.fetchOneUser = async (req, res) => {
    try {
        const user = await userSchema.findOne({ _id: req.params.id })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.fetchTasks = async (req, res) => {
    const {completed}=req.query
    const filterData={
        ownerID:req.userID
    }
    if(completed){
        filterData.completed=completed
    }
    try {
        const tasks = await taskSchema.find(filterData).limit(req.query.limit).skip(req.query.skip ).sort({createdAt:1})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.fetchOneTask = async (req, res) => {
    try {
        const task = await taskSchema.findOne({ _id: req.params.id,ownerID:req.userID })
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.updateUser = async (req, res) => {
    let id = req.userID
    try {
        const updateUser = await userSchema.findOneAndUpdate({ _id: id }, req.body, { new: true })
        if (!updateUser) {
            return res.status(400).json("Not found!")
        }

        res.status(200).json(updateUser)

    } catch (error) {
        res.status(500).json(error)
    }
}



exports.updateTasks = async (req, res) => {
    let id = req.params.id

    try {
        const updateTasks = await taskSchema.findOneAndUpdate({_id:id,ownerID:req.userID}, req.body, { new: true })
        console.log(updateTasks)
        if (!updateTasks) {
            return res.status(400).json("Not found!")
        }

     

        res.status(200).json(updateTasks)

    } catch (error) {
        res.status(500).json(error)
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await userSchema.deleteOne({_id:req.userID})
        if (!deleteUser) {
            return res.status(404).json("User not found")
        }
           await taskSchema.deleteMany({ownerID:req.userID})
        res.status(200).json(deleteUser)


    } catch (error) {
        res.status(500).json(error)
    }
}



exports.deleteTask = async (req, res) => {

    try {
        const deleteTask = await taskSchema.findOneAndDelete({_id:req.params.id,ownerID:req.userID})
        if (!deleteTask) {
            return res.status(404).json("task not found")
        }

        res.status(200).json(deleteTask)


    } catch (error) {
        res.status(500).json(error)
    }
}

exports.onLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const isUser = await userSchema.findOne({ email })
        if (!isUser) {
            return res.status(404).json("User not found!")
        }
        const isMatch = await bcrypt.compare(password, isUser.password)

        if (!isMatch) {
            return res.status(401).json("Password is incorrect")
        }

        const token = jwt.sign({ _id: isUser._id }, 'fazil2005')

        res.status(200).json({
            userData: {
                name: isUser.name,
                email: isUser.email,
                age: isUser.age
            }, token
        })


    } catch (error) {
        res.status(500).json(error)
    }
}


exports.onUpdateProfile=async(req,res)=>{
    try {
        

        const findUser=await userSchema.findOne({_id:req.userID})
         findUser.avatar=req.file.filename
         await findUser.save()
         res.status(200).json(findUser)
    } catch (error) {
        console.log(error)
    }
}

exports.onDeleteUserAvatar=async(req,res)=>{
    try {
        const DeleteProfile=await userSchema.findOneAndUpdate({_id:req.userID},{$set:{avatar:''}},{new:true})
        res.status(200).json(DeleteProfile)
    } catch (error) {
        res.status(500).json(error)
    }
}