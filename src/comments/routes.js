const { Router } = require('express')
const Comment = require('./model')
const Ticket = require('../tickets/model')
const User = require('../users/model')
const authorization = require('../auth/middleware')


const router = new Router()

router.post('/comments',(req, res, next) => {
  Comment
    .findAll({
      where: {
        ticket_id: req.body.ticket_id
      },
      include:[ 
        { model: User, attributes: ['user_name'] },
        { model: Ticket, attributes: ['id','title'] }
      ]
    })
    .then(comments => res.send({ comments }))
    .catch(next)
})

router.get('/comments/:id', (req, res, next) => {
  Comment
    .findByPk(req.params.id,
      { 
      include:[
        { model: User, attributes: ['user_name'] },
        { model: Ticket, attributes:['id','title'] }
      ]
     })
    .then(comment => {
      if (!comment) {
        return res.status(404).send({
          message: 'could not find the comment'
        })
      } else { return res.send(comment) }
    })
    .catch(next)
})

router.post('/add-comment', authorization, (req, res, next) => {
  const { text, ticket_id } = req.body
  if (res.locals.user) {
    const newComment = {
            user_id: res.locals.user.id,
            text: text,
            ticket_id: ticket_id
          }
    Comment
      .create(newComment)
      .then(comment => {
        if (!comment) {
          return res.status(404).send({
            message: 'could not find the comment'
          })
        } else {
         return Comment
          .findAll({
            where: {
              ticket_id: comment.ticket_id
            },
            include:[ 
              { model: User, attributes: ['user_name'] },
              { model: Ticket, attributes: ['id','title'] }
            ]
          })
          .then(comments => res.send({ comments }))
          .catch(next)
        }
      })
      .catch(next)      
  } 
})

router.put('/comments/:id',(req, res, next) => {
  Comment
    .findByPk(req.params.id)
    .then(comment => {
      if (!comment) {
        return res.status(404).send({
          message: 'could not find the comment'
        })
      } return comment.update(req.body).then(comment => res.send(comment))
    })
    .catch(next)
})

router.delete('/comments/:id', (req, res, next) => {
  Comment
    .findByPk(req.params.id)
    .then(comment => {
      if (!comment) {
         return res.status(404).send({
          message: 'could not find the comment'
        })
      } return comment.destroy().then(()=> res.send({
        message: 'comment was deleted'
      }))
    })
    .catch(next)
})

module.exports = router
