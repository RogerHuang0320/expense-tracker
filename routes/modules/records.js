const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

router.post('/', async (req, res) => {
  const userId = req.user._id
  const { name, date, amount, categoryId } = req.body
  await Record.create({ name, date, amount, userId, categoryId })     // 存入資料庫
  res.redirect('/')
})

router.get('/:id/edit', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = await Record.findOne({ _id, userId }).lean()
  const categoryId = record.categoryId
  const categories = await Category.find().lean()
  const categoryName = categories.filter(category => category._id.equals(categoryId))[0].name
  record.date = record.date.toJSON().toString().slice(0, 10)
  return res.render('edit', { record, categories, categoryName })
})

router.put('/:id/edit', async (req, res) => {
  const _id = req.params.id
  await Record.findByIdAndUpdate(_id, req.body)
  res.redirect('/')
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  await Record.findByIdAndDelete(_id)
  res.redirect('/')
})

module.exports = router
