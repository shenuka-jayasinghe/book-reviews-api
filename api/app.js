const express = require("express");
const app = express()
const db = require('../db/connection')
app.use(express.json())
const cors = require('cors');
const { getBooks, getBookbyId, postBookReviews } = require("./controllers/book.controller");
app.use(cors());

app.get('/api/book', getBooks )

app.get('/api/book/:id', getBookbyId )

app.post('/api/book/:id', postBookReviews)

app.get('/api/healthcheck', (req, res) => {
    res.status(200).send({msg:'healthy'})
})

module.exports = app