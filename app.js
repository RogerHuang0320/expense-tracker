require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  // const userId = req.user._id
  Record.find({})
    .lean()
    .then(Records => res.render('index', { Records }))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is now running on http://localhost:3000.')
})
