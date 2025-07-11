import express from 'express'
import { addBook, deleteBook, getBook, getBookById, updateBook } from '../controllers/bookController.js'
const bookRoute = express.Router()

bookRoute.route('/add-book').post(addBook)

bookRoute.route('/get-book').get(getBook)

bookRoute.route('/get-book/:id').get(getBookById)

bookRoute.route('/update-book/:id').put(updateBook)

bookRoute.route('/delete-book/:id').delete(deleteBook)

export default bookRoute