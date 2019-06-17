const { Router } = require('express')
const { toJWT } = require('./jwt')
const bcrypt = require('bcrypt');
const User = require('../users/model')
const authorization = require('./middleware')

const router = new Router()

router.post('/logins', (req, res)=> {
  const email = req.body.email 
  const password = req.body.password 

  if (!email || !password) {
    return res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  } else {
     // 1. find user based on user_name and email address
     User
      .findOne({
        where: {
          email
        }
      }).then(entity => {
          if (!entity) {
              res.status(400).send({
              message:'Could not find a user with that email and password'
            })
          }
        // 2. use bcrypt.compareSync to check the password against the stored hash
          if (bcrypt.compareSync(req.body.password,entity.password)) {
        
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          return res.send({
            jwt: toJWT({ userId: entity.id }),
            user_name: entity.user_name
          })
        } else {
          res.status(400).send({
            message: 'Password was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        }) 
      })
  }
})

router.get('/add-event', authorization, (req, res) => {
  if (res.locals.user) {
    res.send({
      user: res.locals.user
    })
  } 
})

module.exports = router