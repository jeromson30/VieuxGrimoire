const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://jeromson:Assassin13010!@192.168.1.173:27017/vieuxgrimoire?authSource=admin')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée ! ' + error));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use((req, res) => {
    res.json({message: 'Requête reçue !'})
})

module.exports = app