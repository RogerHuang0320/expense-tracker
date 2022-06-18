require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb connected!')
})

db.on('error', () => {
  console.log('mongodb error!')
})

app.get('/', (req, res) => {
  res.send('hello world.')
})

app.listen(3000, () => {
  console.log('App is now running on http://localhost:3000.')
})