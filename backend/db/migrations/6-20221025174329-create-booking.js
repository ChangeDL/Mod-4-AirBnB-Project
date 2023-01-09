'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Spots", key: "id" }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" }
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
    // await queryInterface.addIndex('Bookings',
    //   options,
    //   ['spotId', 'startDate'],
    //   {
    //     unique: true
    //   }
    // )
    // await queryInterface.addIndex('Bookings',
    //   options,
    //   ['userId', 'startDate'],
    //   {
    //     unique: true
    //   }
    // )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings', options);
    // await queryInterface.removeIndex('Bookings',
    //   options,
    //   ['spotId', 'startDate'],
    //   {
    //     unique: true
    //   }
    // )
    // await queryInterface.removeIndex('Bookings',
    //   options
    //   ['userId', 'startDate'],
    //   {
    //     unique: true
    //   }
    // )
  }
};
