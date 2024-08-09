const requiredFieldsTransaction = (req, res, next) => {
    const { description, amount, category_id, type } = req.body

    if (!description || !amount || !category_id || !type) {
        return res.status(400).json({ message: 'Please, ensure that all mandatory fields have been completed' })
    }

    if (type !== "income" && type !== "expense") {
        return res.status(400).json({ message: 'Invalid type of transaction' })
    }

    next();
}

module.exports = { requiredFieldsTransaction }