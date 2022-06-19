const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(Records => res.render('index', { Records }))
    .catch(error => console.log(error))
})

module.exports = router
