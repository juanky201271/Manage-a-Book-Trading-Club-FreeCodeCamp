const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UsersTwitterId = new Schema({
  //key - twitterId
  twitterId: { type: 'String', unique: true },
  name: 'String',
  screenName: 'String',
  profileImageUrl: 'String',
  token: 'String',
  tokenSecret: 'String',
  //profile fields
  fullName: 'String',
  city: 'String',
  state: 'String',
  address: 'String',
})
module.exports = mongoose.model("BTC-users-twitterId", UsersTwitterId)
