const requiredFieldsI = (req, res, next) => {
    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({ message: 'Please, enter a username' })
    }
    if (!email) {
        return res.status(400).json({ message: 'Please, enter your email address' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Please, enter your password' })
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' })
    }

    next()
}

const requiredFieldsII = (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ message: 'Please, enter your email address' })
    }
    if (!password) {
        return res.status(400).json({ message: 'Please, enter your password' })
    }

    next()
}

module.exports = { requiredFieldsI, requiredFieldsII }