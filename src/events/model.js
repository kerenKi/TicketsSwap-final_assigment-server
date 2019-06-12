const Sequelize = require('sequelize')
const sequelize = require('../../db')
const User = require('../users/model')


const Event = sequelize.define('events', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    field: 'description',
    allowNull: false
  },
  picture: {
    type: Sequelize.STRING,
    field: 'picture',
    allowNull: false
  },
  start_time: {
    // type: Sequelize.DATE,
    type: Sequelize.STRING,
    field: 'start_time',
    allowNull: false
  },  
  end_time: {
    type: Sequelize.STRING,
    // type: Sequelize.DATE,
    field: 'end_time',
    allowNull: false
  }, 
   user_id: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'events'
})

Event.belongsTo(User,{
  "foreignKey": "user_id",
})


module.exports = Event