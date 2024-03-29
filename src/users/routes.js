const { Router } = require('express')
const { toJWT } = require('../auth/jwt')
const User = require('./model')
const bcrypt = require('bcrypt');

const router = new Router()

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
      } return res.status(201).send({
        jwt: toJWT({ userId: user.id }),
        user_name: user.user_name
      })
    })
    .catch(next)
})

module.exports = router
