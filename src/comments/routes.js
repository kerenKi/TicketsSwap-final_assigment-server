const { Router } = require('express')
const Comment = require('./model')
const Ticket = require('../tickets/model')
const User = require('../users/model')

const router = new Router()

router.get('/comments',(req, res, next) => {
  Comment
    .findAll({
      include:[ 
        { model: User, attributes: ['name'] },
        { model: Ticket, attributes: ['id','description'] }
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
        { model: User, attributes: ['name'] },
        { model: Ticket, attributes:['id','description'] }
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

router.post('/comments',(req, res, next) => {
  Comment
    .create(req.body)
    .then(comment => {
      if (!comment) {
        return res.status(404).send({
          message: 'could not find the comment'
        })
      } return res.status(201).send(comment)
    })
    .catch(next)
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
