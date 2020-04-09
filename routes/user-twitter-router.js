const express = require('express')

const UserCtrl = require('../controllers/user-twitter-ctrl')

const userRouter = express.Router()

userRouter.put('/usertwitter/:twitterId', UserCtrl.updateUserByTwitterId)
userRouter.get('/usertwitter/:twitterId', UserCtrl.getUserByTwitterId)
userRouter.get('/userstwitter', UserCtrl.getUsersTwitter)

module.exports = userRouter
