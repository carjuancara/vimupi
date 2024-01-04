const Sequelize = require('sequelize')
const filesModel = require('./Model/Files')
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/vimupiDB', {
  logging: false,
  native: false
})

filesModel(sequelize)
module.exports = {
  ...sequelize.models,
  conn: sequelize
}
