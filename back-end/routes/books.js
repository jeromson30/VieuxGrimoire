const express = require('express')
const router = express.Router()
const {createBook, modifyBook, getBook, getAllBooks, deleteBook, mostratedBooks, addRate} = require('../controllers/books')
const auth = require('../middleware/auth')
const multer = require('../middleware/multerConfig')

router.post('/', auth, multer, createBook)

// MAJ dans la collection Books l'object avec l'ID en paramètre
router.put('/:id', auth, multer, modifyBook)

router.get('/bestrating/', mostratedBooks)

// Recupere dans la collection Books l'object avec l'ID en paramètre
router.get('/:id', getBook)

router.post('/:id/rating', auth, addRate)

// Recupere toutes la collections Books
router.get('/', getAllBooks)



// Supprime dans la collection Books l'object avec l'ID en paramètre
router.delete('/:id', auth, deleteBook)


module.exports = router