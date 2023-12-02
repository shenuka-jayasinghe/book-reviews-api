const {cleanGenres} = require('../utils/cleanGenres')
const testData = require('./testData')

describe('cleanGenres utility function tests', () => {
    test('should return an array', () => {
        const result = cleanGenres(testData)
        expect(Array.isArray(result)).toBe(true);
    });
    test('should return genres property', () => {
        const result = cleanGenres(testData)
        expect(result[0].hasOwnProperty('genres')).toBe(true);
    });
    test('should not mutate original array', () => {
        const result = cleanGenres(testData)
        expect(result).not.toBe(testData);
        expect(result[0]).toEqual({
            book_id: 1,
            title: "The Hitchhiker's Guide to the Galaxy",
            author: 'Douglas Adams',
            book_desc: 'Embark on a hilarious and absurd journey through space filled with witty observations and delightful characters. This sci-fi comedy is a must-read for those seeking an intergalactic adventure.',
            image_path: 'https://m.media-amazon.com/images/I/91lFJOYspuL._SL1500_.jpg',
            genres: [ 'science-fiction', 'adventure' ],
            average_rating: '3.0',
            reviews: [
              'A hilarious and absurd journey through space, filled with witty observations and delightful characters. This sci-fi comedy is a must-read for those seeking an intergalactic adventure.',
              "Adams' clever writing and imaginative world-building make this a unique and entertaining read. The quirky humor and satire create an unforgettable experience.",
              'This book is a blend of sci-fi and humor, a joyride through the galaxy with its unique, offbeat charm. A delightful escape into a universe of absurdity.',
              "Adams' wit and imagination shine in this classic. The absurdity and humor make it a standout in the science fiction genre, offering a fresh and enjoyable read.",
              'A comedic and satirical take on space exploration. The characters and their adventures provide a whimsical escape, making it a beloved classic.',
              'A hilarious and absurd journey through space, filled with witty observations and delightful characters. This sci-fi comedy is a must-read for those seeking an intergalactic adventure.',
              "Adams' clever writing and imaginative world-building make this a unique and entertaining read. The quirky humor and satire create an unforgettable experience.",
              'This book is a blend of sci-fi and humor, a joyride through the galaxy with its unique, offbeat charm. A delightful escape into a universe of absurdity.',
              "Adams' wit and imagination shine in this classic. The absurdity and humor make it a standout in the science fiction genre, offering a fresh and enjoyable read.",
              'A comedic and satirical take on space exploration. The characters and their adventures provide a whimsical escape, making it a beloved classic.'
            ],
            ratings: [
              5, 3, 1, 2, 4,
              5, 3, 1, 2, 4
            ]
          });
    });
});