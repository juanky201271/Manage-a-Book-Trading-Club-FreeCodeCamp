const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const userRouter = express.Router()

userRouter.put('/user/:user_id', UserCtrl.updateUserById)
userRouter.get('/user/:user_id', UserCtrl.getUserById)
userRouter.get('/users', UserCtrl.getUsers)

module.exports = userRouter
