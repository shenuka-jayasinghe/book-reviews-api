const db = require("./connection");
const format = require("pg-format");

const seed = () => {
    console.log("reached1")
  return db
    .query(
      `DROP DATABASE IF EXISTS test_bookshop;`
    )
    .then(() => {
    `CREATE DATABASE test_bookshop;`
    })
    .then(() => {
      return db.query(`CREATE TABLE my_bookshop ( 
            book_id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            price_in_pence INT NOT NULL,
            quantity_in_stock INT NOT NULL,
            release_date DATE NOT NULL,
            is_fiction BOOLEAN NOT NULL
        );
        `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO my_bookshop
    (title, price_in_pence, quantity_in_stock, release_date, is_fiction)
VALUES
    ('The Hitchhiker''s Guide to the Galaxy', 899, 560, '1997-10-12', true),
    ('The Little Prince', 699, 1020, '1943-04-06', true),
    ('The Tale of Peter Rabbit', 599, 1000, '1902-10-01', true),
    ('Emma', 522, 390, '1815-12-23', true),
    ('Nineteen Eighty-Four: A Novel', 799, 420, '1946-06-08', true),
    ('The Handmaid''s Tale', 899, 10, '1985-08-01', true),
    ('The War of the Worlds', 250, 17, '1897-04-01', true),
    ('Captain Corelli''s Mandolin', 999, 0, '1995-08-29', true),
    ('A Brief History of Time', 825, 0, '1988-04-01', false),
    ('Pride and Prejudice', 699, 4, '1813-01-28', true);

        `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE authors ( 
            id SERIAL PRIMARY KEY,
            author VARCHAR(50) NOT NULL,
            fun_facts VARCHAR(1000) NOT NULL
        );
        
        INSERT INTO authors
            (author, fun_facts)
        VALUES 
            ('Tolkien', 'He considered himself a hobbit.');`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE roles (
            role_id SERIAL PRIMARY KEY,
            role VARCHAR(100)
        )
        `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO authors
        (author, fun_facts)
    VALUES
        ('Dan Brown', 'Favourits colour is not brown.'),
        ('Antoine de Saint-Exupéry', 'He was a successful commercial pilot before World War II, working airmail routes in Europe, Africa, and South America.'),
        ('Douglas Adams', 'He made two appearances in Monty Python''s Flying Circus.'),
        ('Stephen Hawking', 'Doctors told him he wouldn''t live past his early 20s.'),
        ('Eric Carle', 'When he was a young boy, Carle had a dream that he would build a bridge from Germany to America.'),
        ('J. D. Salinger', 'The Catcher in the Rye was the only novel that J.D. Salinger published during his lifetime - not bad for a first try!'),
        ('Beatrix Potter', 'Between 1881 and 1897 Potter kept a journal in which she jotted down her private thoughts in a secret code . This code was so fiendishly difficult it was not cracked and translated until 1958.'),
        ('C. S. Lewis', 'Lewis set up a charitable trust to give away whatever money he received from his books.'),
        ('Roald Dahl', 'During World War II he passed intelligence to MI6 from Washington.'),
        ('Frank Herbert', 'While conversing with fungi expert Paul Stamets, Herbert revealed that the world of Dune was influenced by the lifecycle of mushrooms, with his imagination being helped along by a more "magic" variety.'),
        ('Louis de Bernières', 'De Bernières is an avid musician who plays flute, mandolin, clarinet and guitar.'),
        ('H. G. Wells', 'In 1914 H.G. Wells published a novel titled The World Set Free. In this book he described a weapon that was eerily similar to the first atomic bomb unleashed on the Japanese cities of Hiroshima and Nagasaki in 1945.'),
        ('George Orwell', 'Orwell intentionally got himself arrested for being "drunk and incapable".'),
        ('Jane Austen', 'The author of her first novel, Sense and Sensibility, was simply "A Lady", and her later works like Pride and Prejudice were credited to "the Author of Sense and Sensibility". She wasn''t named as the author of her novels until after her death!'),
        ('Margaret Atwood', 'Atwood was the first author to contribute to The Future Library Project, which will take one writer''s contribution each year for one hundred years to be printed in the year 2114.');   
        `);
    })
    .then(() => {
      return db.query(`
                ALTER TABLE my_bookshop
        ADD COLUMN author_id INT
                REFERENCES authors(id)
                ON DELETE CASCADE
        ;

        UPDATE my_bookshop
        SET author_id = CASE 
            WHEN book_id = 1 THEN 4
            WHEN book_id = 2 THEN 3
            WHEN book_id = 3 THEN 8
            WHEN book_id = 4 THEN 15
            WHEN book_id = 5 THEN 14
            WHEN book_id = 6 THEN 16
            WHEN book_id = 7 THEN 13
            WHEN book_id = 10 THEN 15
        END;
        `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE genres (
            id SERIAL PRIMARY KEY,
            genre VARCHAR(50) NOT NULL
        ); 
        INSERT INTO genres
    (genre)
VALUES
    ('science-fiction'),
    ('children''s'),
    ('romance'),
    ('fantasy'),
    ('dystopian'),
    ('science'),
    ('adventure'),
    ('classics'); 
    CREATE TABLE book_genres (
        id SERIAL PRIMARY KEY,
        book_id INTEGER,
        FOREIGN KEY(book_id)
            REFERENCES my_bookshop(book_id)
            ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id)
    );
            `);
    })
    .then(() => {
      return db.query(`
        INSERT INTO book_genres
                (book_id, genre_id)
            VALUES
                (1,1), (1,7), (2,2), (2,4), (2,7), (2,8), (3,2), (3,4),
                (4,3), (4,8), (5,5), (5,8), (6,5), (7,1), (7,7), (10, 3), (10,8);

            SELECT title, genre FROM book_genres
            JOIN my_bookshop ON book_genres.book_id = my_bookshop.book_id
            JOIN genres ON book_genres.genre_id = genres.id
        `);
    })
    .then(() => {
        return db.query(`
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            review VARCHAR(5000) NOT NULL,
            rating INT
        );
        INSERT INTO reviews
            (review, rating)
        VALUES
            ('A hilarious and absurd journey through space, filled with witty observations and delightful characters. This sci-fi comedy is a must-read for those seeking an intergalactic adventure.', 5),
            ('Adams'' clever writing and imaginative world-building make this a unique and entertaining read. The quirky humor and satire create an unforgettable experience.', 3),
            ('This book is a blend of sci-fi and humor, a joyride through the galaxy with its unique, offbeat charm. A delightful escape into a universe of absurdity.', 1),
            ('Adams'' wit and imagination shine in this classic. The absurdity and humor make it a standout in the science fiction genre, offering a fresh and enjoyable read.', 2),
            ('A comedic and satirical take on space exploration. The characters and their adventures provide a whimsical escape, making it a beloved classic.', 4),
        
            ('A heartfelt and philosophical journey that delves into the complexities of human nature. This whimsical yet profound tale is a timeless classic that speaks to both children and adults.', 5),
            ('Saint-Exupéry''s poetic storytelling weaves a beautiful narrative exploring love, loss, and the essence of life. This book''s wisdom transcends age, resonating with readers across generations.', 4),
            ('An enchanting and thought-provoking story that captures the innocence of childhood and the wisdom of adulthood. Its elegant simplicity conceals deep and profound messages about life.', 4),
            ('This charming fable is a philosophical gem, exploring profound themes in a deceptively simple tale. The emotional depth and wisdom woven into its pages make it a literary treasure.', 5),
            ('A beautifully crafted story that touches the soul with its poetic narrative. Saint-Exupéry''s masterpiece continues to inspire introspection and contemplation.', 5),
        
            ('Potter''s classic tale of a mischievous rabbit is a delightful and timeless story that continues to captivate young readers. The charming illustrations and adventurous plot make it a cherished children''s book.', 3),
            ('A beloved story filled with adventure and mischief. Potter''s detailed illustrations bring the tale to life, creating a captivating experience for young readers.', 3),
            ('An endearing story of a naughty but lovable rabbit. Potter''s engaging storytelling and vibrant illustrations make this a perennial favorite among children and adults alike.', 3),
            ('Potter''s enchanting narrative and charming illustrations make this a timeless classic for children. The mischievous Peter Rabbit''s adventures continue to enchant new generations of readers.', 2),
            ('A delightful and engaging story that has remained a beloved classic for generations. Potter''s charming storytelling and beautiful illustrations make this a must-read for children.', 4),
        
            ('A delightful comedy of manners that delves into human nature and the complexities of love and society. Austen''s wit and character development make "Emma" a timeless classic.', 1),
            ('Austen''s novel showcases her mastery in depicting the nuances of social hierarchy and romantic entanglements. "Emma" remains a compelling and engaging read for those interested in classic literature.', 2),
            ('Austen''s exploration of the complexities of relationships and society is masterfully depicted in "Emma." The novel''s wit, charm, and character development make it a timeless classic.', 2),
            ('Austen''s astute observations of human behavior and her skillful storytelling shine in "Emma." The novel''s witty dialogue and intricate relationships make it a must-read for classic literature enthusiasts.', 3),
            ('Austen''s "Emma" is a captivating tale of love, self-discovery, and societal expectations. The novel''s rich character development and Austen''s keen insight into human nature make it a compelling read.', 3),
        
            ('Orwell''s dystopian masterpiece remains a chilling and prescient warning about the dangers of totalitarianism and surveillance. "1984" is a thought-provoking and compelling read.', 4),
            ('Orwell''s depiction of a dystopian society is both haunting and thought-provoking. "1984" continues to resonate for its stark portrayal of government control and manipulation.', 3),
            ('Orwell''s exploration of a bleak and oppressive future is a powerful and cautionary tale. "1984" remains a timeless and relevant commentary on the potential dangers of authoritarian regimes.', 3),
            ('Orwell''s dark and gripping narrative is a stark warning about the perils of unchecked power and propaganda. "1984" remains an essential read, evoking deep reflection on society.', 4),
            ('A haunting and compelling vision of a dystopian future, "1984" continues to provoke contemplation about the nature of power, truth, and societal control.', 5),
        
            ('Atwood''s chilling dystopian novel offers a powerful commentary on gender, control, and societal manipulation. "The Handmaid''s Tale" is a haunting and thought-provoking narrative.', 4),
            ('Atwood''s provocative and unsettling portrayal of a society where women''s rights are stripped is a stark and resonant story. "The Handmaid''s Tale" remains a gripping and powerful read.', 3),
        
            ('Wells'' work is a groundbreaking science fiction classic that vividly depicts an alien invasion and the ensuing struggle for survival. The narrative''s tension and vivid descriptions create an immersive reading experience.', 5),
            ('A gripping and imaginative tale of Martian invasion, "The War of the Worlds" remains a compelling and timeless science fiction novel. Wells'' vision and detailed descriptions of the Martian attacks continue to enthrall readers.', 2);
        
        
        
        
        CREATE TABLE book_reviews (
            id SERIAL PRIMARY KEY,
            book_id INTEGER,
            FOREIGN KEY(book_id)
                REFERENCES my_bookshop(book_id)
                ON DELETE CASCADE,
            review_id INTEGER REFERENCES reviews(id)
        );
        
        INSERT INTO book_reviews
            (book_id, review_id)
        VALUES
            (1,1), (1,2), (1,3), (1,4), (1,5),
            (2,6), (2,7), (2,8), (2,9), (2,10), 
            (3,11), (3,12), (3,13), (3,14), (3,15), 
            (4,16), (4,17), (4,18), (4,19), (4,20),
            (5,21), (5,22), (5,23), (5,24), (5,25),
            (6,26), (6,27),
            (7,28), (7,29);
        `)
    })
    .then(() => {
        return db.query(`
        ALTER TABLE my_bookshop
ADD COLUMN image_path VARCHAR(100);

UPDATE my_bookshop
SET image_path = CASE 
    WHEN book_id = 1 THEN 'https://m.media-amazon.com/images/I/91lFJOYspuL._SL1500_.jpg'
    WHEN book_id = 2 THEN 'https://m.media-amazon.com/images/I/71QKrhhMJIL._SL1500_.jpg'
    WHEN book_id = 3 THEN 'https://m.media-amazon.com/images/I/61ASCNFMAlL._SL1500_.jpg'
    WHEN book_id = 4 THEN 'https://m.media-amazon.com/images/I/91PEkzhb80L._SL1500_.jpg'
    WHEN book_id = 5 THEN 'https://m.media-amazon.com/images/I/91sHa+O7bWS._SL1500_.jpg'
    WHEN book_id = 6 THEN 'https://m.media-amazon.com/images/I/61HvDoc16sL._SL1170_.jpg'
    WHEN book_id = 7 THEN 'https://m.media-amazon.com/images/I/81FBh5Q17xL._SL1500_.jpg'
    WHEN book_id = 10 THEN 'https://m.media-amazon.com/images/I/91bckGWvmlL._SL1500_.jpg'
END;

ALTER TABLE my_bookshop
ADD COLUMN book_desc VARCHAR(1000);
UPDATE my_bookshop
SET book_desc = CASE 
    WHEN book_id = 1 THEN 'Embark on a hilarious and absurd journey through space filled with witty observations and delightful characters. This sci-fi comedy is a must-read for those seeking an intergalactic adventure.'
    WHEN book_id = 2 THEN 'A heartfelt and philosophical journey that delves into the complexities of human nature. This whimsical yet profound tale is a timeless classic that speaks to both children and adults.'
    WHEN book_id = 3 THEN 'Potter''s classic tale of a mischievous rabbit is a delightful and timeless story that continues to captivate young readers. The charming illustrations and adventurous plot make it a cherished children''s book.'
    WHEN book_id = 4 THEN 'A delightful comedy of manners that delves into human nature and the complexities of love and society. Austen''s wit and character development make ''Emma'' a timeless classic.'
    WHEN book_id = 5 THEN 'Orwell''s dystopian masterpiece remains a chilling and prescient warning about the dangers of totalitarianism and surveillance. ''1984'' is a thought-provoking and compelling read.'
    WHEN book_id = 6 THEN 'Atwood''s chilling dystopian novel offers a powerful commentary on gender, control, and societal manipulation. ''The Handmaid''s Tale'' is a haunting and thought-provoking narrative.'
    WHEN book_id = 7 THEN 'Wells'' work is a groundbreaking science fiction classic that vividly depicts an alien invasion and the ensuing struggle for survival. The narrative''s tension and vivid descriptions create an immersive reading experience.'
    WHEN book_id = 10 THEN 'A timeless masterpiece exploring societal expectations and the complexities of love. The novel''s wit, character development, and social commentary make it an enduring classic.'
END;
        `)
    })
};

seed().then(() => db.end())