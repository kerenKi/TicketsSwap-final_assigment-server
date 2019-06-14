const { Router } = require('express')
const Event = require('./model')
const User = require('../users/model')
const authorization = require('../auth/middleware')


const router = new Router()

router.get('/events',(req, res, next) => {
  Event
    .findAll({
      include:[{ model: User, attributes: ['user_name'] }]
    })
    .then(events => res.send({ events }))
    .catch(next)
})

router.get('/events/:id', (req, res, next) => {
  Event
    .findByPk(req.params.id, { 
      include:[{ model: User, attributes: ['user_name'] }] 
    })
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: 'could not find the event'
        })
      } else { return res.send(event) }
    })
    .catch(next)
})

router.post('/add-event',authorization, (req, res, next) => {
  const { name, picture, description, start_time, end_time } = req.body
  if (res.locals.user) {
    const newEvent = {
      user_id: res.locals.user.id,
      name,
      picture, 
      description, 
      start_time, 
      end_time
    }
    Event
    .create(newEvent)
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: 'could not find the event'
        })
      } else {
        return Event
        .findAll({
          include:[{ model: User, attributes: ['user_name'] }]
        })
        .then(events => res.send({ events }))
        .catch(next)
      } 
    })
    .catch(next)
  }
})

router.put('/events/:id',(req, res, next) => {
  Event
    .findByPk(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: 'could not find the event'
        })
      } return event.update(req.body).then(event => res.send(event))
    })
    .catch(next)
})

router.delete('/events/:id', (req, res, next) => {
  Event
    .findByPk(req.params.id)
    .then(event => {
      if (!event) {
         return res.status(404).send({
          message: 'could not find the event'
        })
      } return event.destroy().then(()=> res.send({
        message: 'event was deleted'
      }))
    })
    .catch(next)
})

module.exports = router
