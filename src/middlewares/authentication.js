require('dotenv').config()
const knex = require('../services/conection')
const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthenticated user' })
    }

    try {
        const token = authorization.replace('Bearer ', '').trim()

        const { id } = jwt.verify(token, process.env.JWT_PASS)

        const userExist = await knex('users').where({ id }).first()
        if (!userExist) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { password, ...userAccount } = userExist

        req.user = userAccount

        next()

    } catch (error) {
        console.error('Error unauthenticated user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { authentication }