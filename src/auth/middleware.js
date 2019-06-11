const User = require('../users/model')
const { toData } = require('./jwt')


function authorization(req, res, next) {
  console.log('authorization started')
  //req.headers.authorization.split will be an array ['Bearer',very long token]
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  // if the authorization header exist,
  // when the first item in the array is 'Bearer' and the second item in is a token:
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      //auth[1] is the token that is passed to toData to get the data
      const data = toData(auth[1])
      console.log('data:', data)
      User
        .findByPk(data.userId)
        .then(user => {
          if (!user) return next('User does not exist')
          console.log('user', user)
          
          res.locals.user = {
            id: user.id,
          user_name: user.user_name
          }
          console.log('res.locals.user', res.locals.user)
          next()
        })
        .catch(next)
    }
    catch(error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
}

module.exports = authorization