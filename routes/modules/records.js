const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  const categories = Category.find({}).lean()
  console.log(categories)
  return res.render('new', { categories })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Record.create({ name, userId })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

module.exports = router
