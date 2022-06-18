require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb connected!')
})

db.on('error', () => {
  console.log('mongodb error!')
})

module.exports = db
