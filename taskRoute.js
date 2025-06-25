const express=require('express')
const controllers=require('./controller')

const Router=express.Router()




Router.post('/addtask',controllers.newTask)

Router.get('/fetchTasks',controllers.fetchTasks)
Router.get('/fetchTask/:id',controllers.fetchOneTask)



Router.patch("/updatetask/:id",controllers.updateTasks)

Router.delete('/deletetask/:id',controllers.deleteTask)

module.exports=Router
