'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  events.init({
    eventid: DataTypes.STRING,
    name: DataTypes.STRING,
    firstdate: DataTypes.DATEONLY,
    lastdate: DataTypes.DATEONLY,
    duration: DataTypes.INTEGER,
    firsttime: DataTypes.INTEGER,
    lasttime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'events',
    underscored: true,
  });
  return events;
};