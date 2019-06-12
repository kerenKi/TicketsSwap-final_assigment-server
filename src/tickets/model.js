const Sequelize = require('sequelize')
const sequelize = require('../../db')
const User = require('../users/model')
const Event = require('../events/model')

const Ticket = sequelize.define('tickets', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING,
    field: 'picture',
  },
  description: {
    type: Sequelize.TEXT,
    field: 'description',
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    field: 'price',
    allowNull: false
  },
  event_id: {
    type: Sequelize.INTEGER,
    field: 'event_id',
    allowNull: false
  },   
   user_id: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false
  }
}, {
  tableName: 'tickets'
})

Ticket.belongsTo(User,{
  "foreignKey": "user_id",
})

Ticket.belongsTo(Event,{
  "foreignKey": "event_id",
})

module.exports = Ticket