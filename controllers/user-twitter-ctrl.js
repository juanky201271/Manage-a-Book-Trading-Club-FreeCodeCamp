const User = require('../models/user-model')
const UserTwitter = require('../models/user-twitter-model')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

updateUserByTwitterId = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a user twitter', })
  }
  await UserTwitter
    .findOne({ twitterId: req.params.twitterId }, (err, userTwitter) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!userTwitter) {
        return res.status(404).json({ success: false, error: 'User twitter not found', })
      }
      userTwitter.votes = body.votes
      //await
      userTwitter
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            twitterId: userTwitter.twitterId,
            message: 'User updated!',
          })
        })
        .catch(err => {
          return res.status(400).json({ success: false, error: err, })
        })
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getUserByTwitterId = async (req, res) => {
  await UserTwitter
    .findOne({ twitterId: req.params.twitterId }, (err, userTwitter) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!userTwitter) {
        return res.status(404).json({ success: false, error: 'User twitter not found by id', })
      }
      return res.status(200).json({ success: true, data: userTwitter })
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getUsersTwitter = async (req, res) => {
  await UserTwitter
    .find({}, (err, usersTwitter) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!usersTwitter.length) {
        return res.status(404).json({ success: false, error: 'Users not found', })
      }
      return res.status(200).json({ success: true, data: usersTwitter})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

module.exports = {
  createUser,
  updateUserById,
  updateUserByIp,
  deleteUserById,
  deleteUserByIp,
  getUserById,
  getUserByIp,
  getUsers,
  updateUserByTwitterId,
  getUserByTwitterId,
  getUsersTwitter,
}
