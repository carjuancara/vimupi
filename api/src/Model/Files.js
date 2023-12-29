const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Files', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type:{
      type:DataTypes.STRING,
      allowNull:false
    },
    size:{
      type: DataTypes.INTEGER
    }
  })
}