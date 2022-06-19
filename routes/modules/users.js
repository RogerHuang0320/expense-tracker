const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()  //Passport.js 提供的函式，會幫你清除 session
  // req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router