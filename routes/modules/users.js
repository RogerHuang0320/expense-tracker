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

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'You have to fill up all the blanks.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and confirmPassword are not the same.' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  await User.create({ name, email, password: hash })
  req.flash('success_messages', 'You have successfully registered!')
  res.redirect('/users/login')
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    res.redirect('/');
    if (err) { return next(err); }
  });
});

module.exports = router