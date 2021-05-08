const express = require('express')
const BookManagement = require('./controllers/bookManagement')

const route = express.Router()


route.get('/books', BookManagement.getBooks)

route.get('/books/:id', BookManagement.getBookById)

route.post('/books', BookManagement.addNewBook)

route.put('/books/:id', BookManagement.updateBookById)

route.patch('/books/:id', BookManagement.updateBookTitle)

route.delete('/books/:id', BookManagement.deleteBookById)


module.exports = route
