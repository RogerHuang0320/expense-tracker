require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.use(routes)
app.listen(3000, () => {
  console.log('App is now running on http://localhost:3000.')
})
