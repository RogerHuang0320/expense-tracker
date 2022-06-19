const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware

// router.use('/records', records) //中間補authenticator
// router.use('/users', users)
// router.use('/auth', auth)
router.use('/', home) //中間補authenticator

module.exports = router;
