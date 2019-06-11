//Importing from express
const { Router } = require('express')
//Importing the user model from model file
const User = require('./model')

const router = new Router()

//Route handlers: what we do with a request to './signup' route:

router.post('/signup',(req, res, next) => {
  User
    .create(req.body)
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
