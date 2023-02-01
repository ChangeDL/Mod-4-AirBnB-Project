'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date(2025, 10, 23),
        endDate: new Date(2025, 10, 25)
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(2025, 11, 24),
        endDate: new Date(2025, 11, 25)
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date(2025, 10, 24),
        endDate: new Date(2025, 10, 25)
      },
      {
        spotId: 4,
        userId: 3,
        startDate: new Date(2025, 11, 24),
        endDate: new Date(2025, 11, 25)
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date(2025, 9, 24),
        endDate: new Date(2025, 9, 25)
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {
    })
  }
};
