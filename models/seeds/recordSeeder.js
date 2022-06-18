const Category = require('../category')
const User = require('../user')
const Record = require('../record')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Records = require('../../record.json').results
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [{
  name: '廣志',
  email: 'user1@example.com',
  password: '1234',
  records: [1, 2]
}, {
  name: '小新',
  email: 'user2@example.com',
  password: '1234',
  records: [3, 4, 5]
}]

db.once('open', () => {
  return Promise.all(
    Array.from({ length: SEED_USER.length }, (_, i) => {
      return bcrypt //為了建立user用的
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash
        }))
        .then(user => {
          const individualRec = Records.filter(data => {
            return SEED_USER[i].records.includes(data.id)
          })
          const userId = user._id
          return Promise.all(Array.from(
            individualRec,
            eachRec => {
              eachRec.userId = userId;
              return Category
                .findOne({ name: eachRec.category })
                .lean()
                .then(category => {
                  eachRec.categoryId = category._id;
                  return Record.create(eachRec)
                })
            }))
        })
    })
  )
    .then(() => {
      console.log("recordSeeder done.")
      process.exit()
    })
    .catch(err => console.log(err))
})

db.on('error', () => {
  console.log('mongodb error!')
})