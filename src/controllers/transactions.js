const knex = require('../services/conection')
const { format } = require('date-fns');

const listTransactions = async (req, res) => {
    const { id } = req.user

    try {
        const transactions = await knex('transactions').where({ user_id: id })
        if (!transactions) {
            return res.status(200).json({ message: 'There are no transactions associated with this account' })
        }

        return res.status(200).json(transactions)
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const detailTransactions = async (req, res) => {
    const { id } = req.params
    const user_id = req.user.id

    try {
        const transactions = await knex('transactions').where({ id, user_id })
        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'Transaction not found' })
        }

        return res.status(200).json(transactions)
    } catch (error) {
        console.error('Error detailing transaction:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const registerTransactions = async (req, res) => {
    const { id } = req.user
    const { description, amount, category_id, type } = req.body

    try {
        const transaction = await knex('transactions').insert({
            type,
            description,
            amount,
            date: format(new Date(), 'dd/MM/yyyy'),
            user_id: id,
            category_id,
            category_name: req.category.description
        }).returning('*')

        transaction[0].date = format(new Date(transaction[0].date), 'dd/MM/yyyy')

        return res.status(201).json(transaction)
    } catch (error) {
        console.error('Error registering transaction:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const updateTransactions = async (req, res) => {
    const { id } = req.user
    const { description, amount, category_id, type } = req.body

    try {
        const transaction = await knex('transactions').update({
            type,
            description,
            amount,
            date: format(new Date(), 'dd/MM/yyyy'),
            user_id: id,
            category_id,
            category_name: req.category.description
        }).where({ id }).returning('*')

        transaction[0].date = format(new Date(transaction[0].date), 'dd/MM/yyyy')
    
        return res.status(201).json(transaction)
    } catch (error) {
        console.error('Error updating transaction:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params
    const user_id = req.user.id

    try {
        const transaction = await knex('transactions').where({ id, user_id }).del()

        return res.status(204).send()
    } catch (error) {
        console.error('Error deleting transaction:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { listTransactions, detailTransactions, registerTransactions, updateTransactions, deleteTransaction }