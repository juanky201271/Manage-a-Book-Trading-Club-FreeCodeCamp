const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Books = new Schema({
  //key - _id
  title: {type: 'String', required: true},
  author: {type: 'String', rquired: true},
  twitterId: {type: 'String', required: true},
})
module.exports = mongoose.model('BTC-books', Books)
