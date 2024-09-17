const knex = require('../services/conection')

const findCategoryById = async (req, res, next) => {
  try {
    const { category_id } = req.body

    const category = await knex("categories").where({ id: category_id }).first()
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    req.category = category
    next()

  } catch (error) {
    console.error("Error finding category by id:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const findTransactionById = async (req, res, next) => {
  try{
    const { id } = req.params

    const transactions = await knex('transactions').where({ id })
    if (!transactions || transactions.length === 0) {
        return res.status(404).json({ message: 'Transaction not found' })
    }
    
    next()
  } catch (error) {
    console.error("Error finding transaction by id:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = { findCategoryById, findTransactionById }