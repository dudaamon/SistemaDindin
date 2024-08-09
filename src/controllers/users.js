require('dotenv').config()
const knex = require('../services/conection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const hashPass = await bcrypt.hash(password, 10)

        await knex('users').insert({
            name,
            email,
            password: hashPass,
        })

        return res.status(201).json({ message: 'User registered successfully' })

    } catch (error) {
        console.error('Error registering user:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userAccount = await knex('users').where({ email }).first()
        if (!userAccount) {
            return res.status(404).json({ message: 'Account not found' })
        }

        const loggedInUser = await bcrypt.compare(password, userAccount.password)
        if (!loggedInUser) {
            return res.status(404).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: userAccount.id }, process.env.JWT_PASS, { expiresIn: '8h' })

        return res.status(200).json({ user: userAccount.name, token })

    } catch (error) {
        console.error('Error logging in user:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const detailUser = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.error('Error detailing user:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const editUser = async (req, res) => {
    const { name, email, password } = req.body
    const { id } = req.user

    try {
        const userAccount = await knex('users').where({ id }).first()
        if (!userAccount) {
            return res.status(404).json({ message: 'Account not found' })
        }

        if (email !== req.user.email) {
            const userEmail = await knex('users').where({ email }).first()
            if (userEmail) {
                return res.status(400).json({ message: 'This email address is already in use by another user' })
            }
        }

        const hashPass = await bcrypt.hash(password, 10)

        await knex('users').update({
            name,
            email,
            password: hashPass
        }).where({ id }).returning('*')

        return res.status(204).json()

    } catch (error) {
        console.error('Error editing user:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { registerUser, login, detailUser, editUser }