const express = require("express");
const app = express()
const port = 5000
const db = require("./db/connection")
app.use(express.json())
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
app.get("/books", async (req,res) => {
    try{
        const table = await db.query('SELECT my_bookshop.book_id,\
        (ARRAY_AGG(title))[1] AS title,\
        (ARRAY_AGG(author))[1] AS author,\
        (ARRAY_AGG(book_desc))[1] AS book_desc,\
        (ARRAY_AGG(image_path))[1] AS image_path,\
        AVG(rating)::NUMERIC(10,1) AS average_rating,\
        ARRAY_AGG(rating) AS ratings,\
        ARRAY_AGG(review) AS reviews\
        FROM book_reviews\
     FULL OUTER JOIN my_bookshop ON book_reviews.book_id = my_bookshop.book_id\
     FULL OUTER JOIN reviews ON book_reviews.review_id = reviews.id\
     FULL OUTER JOIN authors ON my_bookshop.author_id = authors.id\
     GROUP BY my_bookshop.book_id \
     ORDER BY my_bookshop.book_id\
     LIMIT 8;', (err, result) => {
            if (err) {
                console.error(err);
              } else {
                console.log(result.rows)
                res.status(200).send(result.rows)
                // Process the retrieved data here
              }
        })
    } 
    catch (err) {
        throw err
    }
})

app.post("/reviews", async (req, res) => {
    try {
        const { review, rating } = req.body
        console.log("posted", review, rating )
        const newReview = await db.query("INSERT INTO reviews (review, rating) VALUES($1, $2) RETURNING *;", [review, rating]);
        res.json(newReview.rows[0])
        console.log("succes!")
    } 
    catch{}
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})