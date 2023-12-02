const { getBooksdB, getBookByIdDb, postBookReviewsDb } = require("../models/book.model")

exports.getBooks = (req, res) => {
    getBooksdB().then( result =>{
        console.log("successful request")
        res.status(200).send(result)
    })
}

exports.getBookbyId = (req, res) => {
    const {id} = req.params
    getBookByIdDb(id).then( result => {
        res.status(200).send(result[0])
    })
}

exports.postBookReviews = (req, res, next) => {
    const book_id = req.params.id
    const { body } = req
    postBookReviewsDb(book_id, body).then ( ({msg}) => {
        res.status(201).send({msg})
    })
}