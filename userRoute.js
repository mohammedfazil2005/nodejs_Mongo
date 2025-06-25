const express=require('express')
const controllers=require('./controller')


const Router=express.Router()



Router.post('/addUser',controllers.newUser)

Router.get('/fetchusers',controllers.fetchUsers)
Router.get('/fetchusers/:id',controllers.fetchOneUser)

Router.patch("/updateuser/:id",controllers.updateUser)



Router.delete('/deleteuser/:id',controllers.deleteUser)

module.exports=Router
