const Books = require('../models/Books')
const fs = require('fs')
const path = require('path')

exports.createBook = (req, res) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject._userId
    const book = new Books({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    book.save()
      .then(() => res.status(201).json({message: 'Livre créé avec succès'}))
      .catch(error => res.status(400).json({error}))
}

exports.modifyBook = (req, res) => {
  const bookData = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  }
  delete bookData._id
  delete bookData._userId
  Books.findOne({ _id: req.params.id })
      .then((book) => {
        if(book.userId !== req.auth.userId){
          res.status(410).json({message: "Vous n'êtes pas autorisé à faire cela!" })
        } else {
          Books.updateOne({_id: req.params.id},{ ...bookData, _id: req.params.id })
          .then(() => res.status(200).json({message: 'Livre modifié avec succès'}))
          .catch((error) => res.status(400).json({ error }))
        }
      }
    )
      .catch((error) => res.status(404).json({ error }))
}


exports.getBook = (req, res) => {
    Books.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }))
}

exports.getAllBooks = (req, res) => {
    Books.find()
      .then(book => {  
          res.status(200).json(book)
      })
      .catch(error => res.status(404).json({ error }))
}

exports.deleteBook = (req, res) => {
  Books.findOne({_id: req.params.id})
      .then(book => {
        if(book.userId !== req.auth.userId){
          res.status(401).json({message: "Vous n'êtes pas autorisé à faire cela!" })
        } else {
          const filename = book.imageUrl.split('/images/')[1]
          fs.unlink(path.join(__dirname, '..', 'images', filename), () => {
            Books.deleteOne({_id: req.params.id}) 
              .then(() => { res.status(200).json({ message: 'Livre supprimé avec succès !'})})
              .catch((error) => res.status(401).json({ error }))
          })
        }
      })
      .catch((error) => res.status(404).json({ error }))
}

exports.mostratedBooks = (req, res, next) => {
  Books.find().limit(3).sort({averageRating:-1})
      .then(book => {  
          res.status(200).json(book)
      })
      .catch(error => res.status(404).json({ error }))
}

exports.addRate = (req, res, next) => {
  Books.findOne({_id: req.params.id})
    .then((book) => {
      if(!req.auth.userId){
        res.status(401).json({message: "Vous n'êtes pas autorisé à faire cela!" })
      } else {
        Books.updateOne({_id: book._id },{
          $push: {
            ratings: {
              userId: req.body.userId,
              grade: req.body.rating
            }
          }
        })
        .then(res.status(200).json(console.log({id: req.params.id})))
        .catch((error) => res.status(401).json({ error }))
      }
    })
   .catch((error) => res.status(404).json({ error }))
}