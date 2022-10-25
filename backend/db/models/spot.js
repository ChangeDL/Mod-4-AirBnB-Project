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
      Spots.belongsTo(models.User, { foreignKey: 'ownerId', onDelete: 'CASCADE' })
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
      description: DataTypes.STRING,
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
