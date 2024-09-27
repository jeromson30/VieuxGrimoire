const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Books = require('./models/schema_Books')

mongoose.connect('mongodb://jeromson:Assassin13010!@192.168.1.173:27017/vieuxgrimoire?authSource=admin')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée ! ' + error))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
  });

  app.post('/api/stuff', (req, res, next) => {
    //console.log(req.body)
    //    res.status(201).json({message: 'Coucou !'})
    delete req.body._id

    const books = new Books({
        ...req.body
    })
    books.save()
      .then(res.status(201).json({message: 'Livre sauvegardé !'}))
      .catch(error => res.status(400).json({error}))
    next()
  })





module.exports = app