'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spots.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' })
      Spots.hasMany(models.SpotImages, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
      Spots.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
      Spots.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
    }
  }
  Spots.init(
    {
      ownerId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING,
        validate: {

        }
      },
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          min: 1,
          isNumeric: true
        }
      },
    }, {
    sequelize,
    modelName: 'Spots',
    scopes: {
      updateSpot: {
        attributes: { exclude: ["createdAt", 'updatedAt'] }
      },
    }
  });
  return Spots;
};
