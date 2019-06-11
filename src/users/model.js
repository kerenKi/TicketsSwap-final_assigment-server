const Sequelize = require('sequelize')
const sequelize = require('../../db')


const User = sequelize.define('users', {
  user_name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    field: 'email',
    allowNull: false

  },
  password: {
    type: Sequelize.STRING,
    field: 'password',
    allowNull: false

  }
}, {
  timestamps: false,
  tableName: 'users'
})



module.exports = User