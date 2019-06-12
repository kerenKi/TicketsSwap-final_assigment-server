const { Router } = require('express')
const Ticket = require('./model')
const Event = require('../events/model')
const User = require('../users/model')

const router = new Router()

router.get('/tickets',(req, res, next) => {
  Ticket
    .findAll({
      include:[ 
        { model: User, attributes: ['name'] },
        { model:Event, attributes: ['name'] }
      ]
    })
    .then(tickets => res.send({ tickets }))
    .catch(next)
})

router.get('/tickets/:id', (req, res, next) => {
  Ticket
    .findByPk(req.params.id,
      { 
      include:[{ model: User, attributes: ['name'] },{model:Event, attributes:['name']}]
     })
    .then(ticket => {
      if (!ticket) {
        return res.status(404).send({
          message: 'could not find the ticket'
        })
      } else { return res.send(ticket) }
    })
    .catch(next)
})

router.post('/tickets',(req, res, next) => {
  console.log('req.body',req.body)
  Ticket
    .create(req.body)
    .then(ticket => {
      if (!ticket) {
        return res.status(404).send({
          message: 'could not find the ticket'
        })
      } return res.status(201).send(ticket)
    })
    .catch(next)
})

router.put('/tickets/:id',(req, res, next) => {
  Ticket
    .findByPk(req.params.id)
    .then(ticket => {
      if (!ticket) {
        return res.status(404).send({
          message: 'could not find the ticket'
        })
    
  } return ticket.update(req.body).then(ticket => res.send(ticket))
    })
    .catch(next)
})

router.delete('/tickets/:id', (req, res, next) => {
  Ticket
    .findByPk(req.params.id)
    .then(ticket => {
      if (!ticket) {
         return res.status(404).send({
          message: 'could not find the ticket'
        })
      } return ticket.destroy().then(()=> res.send({
        message: 'ticket was deleted'
      }))
    })
    .catch(next)
})

module.exports = router
