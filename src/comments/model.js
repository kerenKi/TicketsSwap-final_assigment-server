const Sequelize = require('sequelize')
const sequelize = require('../../db')
const User = require('../users/model')
const Ticket = require('../tickets/model')

const Comment = sequelize.define('comments', {
  text: {
    type: Sequelize.STRING,
    field: 'text',
    allowNull: false
  },
  ticket_id: {
    type: Sequelize.INTEGER,
    field: 'ticket_id',
    allowNull: false
  },   
   user_id: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false
  }
}, {
  tableName: 'comments'
})

Comment.belongsTo(Ticket,{
  "foreignKey": "ticket_id",
}) 

Comment.belongsTo(User,{
  "foreignKey": "user_id",
})

module.exports = Comment