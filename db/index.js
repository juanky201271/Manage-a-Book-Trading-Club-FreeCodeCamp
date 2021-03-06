const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGOLAB_YELLOW_URI || process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(e => { console.error('Conn error: ', e.message) })

const db = mongoose.connection

module.exports = db
