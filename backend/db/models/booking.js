'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spots, { foreignKey: 'spotId', onDelete: 'CASCADE' })
      Booking.belongsTo(models.User, { foreignKey: 'UserId', onDelete: 'CASCADE' })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter: this.startDate
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};