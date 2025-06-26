const express=require('express')
const controllers=require('./controller')
const auth=require('./jwtMiddleware')
const Router=express.Router()




Router.post('/addtask',auth,controllers.newTask)

Router.get('/fetchTasks',auth,controllers.fetchTasks)
Router.get('/fetchTask/:id',auth,controllers.fetchOneTask)



Router.patch("/updatetask/:id",auth,controllers.updateTasks)

Router.delete('/deletetask/:id',auth,controllers.deleteTask)

module.exports=Router
