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

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    res.redirect('/');
    if (err) { return next(err); }
  });
});

module.exports = router