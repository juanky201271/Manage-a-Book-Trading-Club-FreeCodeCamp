const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Requests = new Schema({
  //key - ip
  give_book_id: { type: 'String', required: true },
  take_book_id: { type: 'String', required: true },
  twitterId: { type: 'String', required: true },
  take_ok: { type: 'Boolean', required: true },
})
module.exports = mongoose.model('BTC-requests', Requests)
