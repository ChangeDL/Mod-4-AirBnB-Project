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
      Booking.belongsTo(models.Spots, { foreignKey: 'spotId' })
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
    validate: {
      startDateAfterEndDate() {
        if (this.startDate > this.endDate) {
          throw new Error('Start date must be before the end date.');
        }
      }
    }
  });
  return Booking;
};
