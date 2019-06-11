//Importing from express
const { Router } = require('express')
//Importing the user model from model file
const User = require('./model')
//crypt the password from string to hash
const bcrypt = require('bcrypt');

const router = new Router()

//Route handlers: what we do with a request to './signup' route:

router.post('/users',(req, res, next) => {
  User
    .create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'could not find the user'
        })
      } return res.status(201).send(user)
    })
    .catch(next)
})


//export so we can import and use it at index.js 
module.exports = router
