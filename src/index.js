require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

// routes.get('/', async (req, res) => {
//     console.log('Bem feito!');
//     return res.status(202).json({ message: "OKAY" })
// })

app.listen(process.env.PORT);