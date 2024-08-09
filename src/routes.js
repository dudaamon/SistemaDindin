require('dotenv').config()
const express = require('express')
const { requiredFieldsI, requiredFieldsII } = require('./middlewares/verifyFormUser')
const { registerUser, login, detailUser, editUser } = require('./controllers/users')
const verifyEmailExists = require('./middlewares/verifyUserEmail')
const { authentication } = require('./middlewares/authentication')
const { listCategories } = require('./controllers/categories')
const { listTransactions, detailTransactions, registerTransactions, updateTransactions, deleteTransaction } = require('./controllers/transactions')
const { requiredFieldsTransaction } = require('./middlewares/verifyFormTransactions')
const { findCategoryById, findTransactionById } = require('./middlewares/verifyById')

const routes = express()
routes.use(express.json())

routes.post('/user', requiredFieldsI, verifyEmailExists, registerUser)
routes.post('/login', requiredFieldsII, login)

routes.use(authentication)

routes.get('/user', detailUser)
routes.put('/user', requiredFieldsI, editUser)

routes.get('/category', listCategories)
routes.get('/transaction', listTransactions)

routes.get('/transaction/:id', detailTransactions)
routes.post('/transaction', requiredFieldsTransaction, findCategoryById, registerTransactions)
routes.put('/transaction/:id', requiredFieldsTransaction, findCategoryById, findTransactionById, updateTransactions)
routes.delete('/transaction/:id', findTransactionById, deleteTransaction)

module.exports = routes
