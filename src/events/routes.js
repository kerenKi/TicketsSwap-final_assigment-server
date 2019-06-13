const { Router } = require('express')
const Event = require('./model')
const User = require('../users/model')

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

router.post('/events',(req, res, next) => {
  Event
    .create(req.body)
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: 'could not find the event'
        })
      } return res.status(201).send(event)
    })
    .catch(next)
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
