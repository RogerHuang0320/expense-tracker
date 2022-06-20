const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const sort = req.query.sort
  const records = await Record.find({ userId }).lean()
  const categories = await Category.find().lean()
  let filterRecord = records
  let totalAmount = 0
  //計算totalAmount、拿出存在category的icon、處理時間格式
  records.forEach(record => {
    const categoryId = record.categoryId
    record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
    record.date = record.date.toJSON().toString().slice(0, 10)
    totalAmount += record.amount
  })
  //篩選
  if (sort) {
    const categoryId = categories.filter(category => category.name === sort)[0]._id
    totalAmount = 0
    filterRecord = records.filter(record => record.categoryId.equals(categoryId))
    filterRecord.forEach(record => {
      record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
      totalAmount += record.amount
    })
  }
  return res.render('index', {
    records: filterRecord,
    totalAmount
  })
})

module.exports = router
