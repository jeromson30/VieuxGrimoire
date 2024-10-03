const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/User')

exports.signupUser = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const userData = new user({
                email: req.body.email,
                password: hash
                  })
            userData.save()
                  .then(() => res.status(201).json({message: 'Utilisateur créé avec succès'}))
                  .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

exports.loginUser = (req, res) => {
    user.findOne({email: req.body.email})
      .then(userData => {
        if(userData === null){
            res.status(401).json({message: 'identifiant/mot de passe incorrect'})
        } else {
            bcrypt.compare(req.body.password, userData.password)
              .then(valid => {
                if(!valid){
                    res.status(401).json({message: 'identifiant/mot de passe incorrect'})
                } else {
                    res.status(200).json({
                        userId: userData._id,
                        token: jwt.sign(
                            {userId: userData._id},
                            'RANDOM_SECRET_TOKEN',
                            {expiresIn: '24h'})
                        })
                }
              })
        }
      })
        
      .catch(error => res.status(500).json({ error }))
}