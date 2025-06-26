const express=require('express')
const controllers=require('./controller')
const authentication=require('./jwtMiddleware')
const multer=require('./multer')

const Router=express.Router()



Router.post('/addUser',controllers.newUser)

Router.get('/fetchusers/me',authentication,controllers.fetchUsers)


Router.patch("/updateuser",authentication,controllers.updateUser)
Router.delete('/deleteuser/:id',authentication,controllers.deleteUser)

Router.post('/login',controllers.onLogin)

Router.post('/uploadimage',authentication,multer.single('image'),controllers.onUpdateProfile)


Router.post('/deleteAvatar',authentication,controllers.onDeleteUserAvatar)

module.exports=Router
