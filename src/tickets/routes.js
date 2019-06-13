const { Router } = require('express')
const Ticket = require('./model')
const Event = require('../events/model')
const User = require('../users/model')
const authorization = require('../auth/middleware')


const router = new Router()

router.post('/tickets',(req, res, next) => {
  Ticket
    .findAll({
      where: {
        event_id: req.body.event_id
      },
      include:[ 
        { model: User, attributes: ['user_name'] },
        { model: Event, attributes: ['name'] }
      ]
    })
    .then(tickets => res.send({ tickets }))
    .catch(next)
})

router.get('/tickets/:id', (req, res, next) => {
  Ticket
    .findByPk(req.params.id,
      { 
      include:[
        { model: User, attributes: ['user_name'] },
        { model: Event, attributes:['name'] }
      ]
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

router.post('/add-ticket',authorization, (req, res, next) => {
  const { event_id, title, picture, description, price } = req.body
  if (res.locals.user) {
    const newTicket = {
      user_id: res.locals.user.id,
      event_id,
      title,
      picture,
      description, 
      price
    }
    Ticket
    .create(newTicket)
    .then(ticket => {
      if (!ticket) {
        return res.status(404).send({
          message: 'could not find the ticket'
        })
      } else {
        return Ticket
        .findAll({
          where: {
            event_id: req.body.event_id
          },
          include:[ 
            { model: User, attributes: ['user_name'] },
            { model: Event, attributes: ['name'] }
          ]
        })
        .then(tickets => res.send({ tickets }))
        .catch(next) 
      }
    })
    .catch(next)
  }   
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
