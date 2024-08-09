const knex = require('../services/conection')

const verifyEmailExists = async (req, res, next) => {
    const { email } = req.body

    try {
        const emailExists = await knex('users').where({ email }).first()
        if (emailExists) {
            return res.status(400).json({ message: 'This email address already exists' })
        }

        next()

    } catch (error) {
        console.error('Error registering email:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = verifyEmailExists