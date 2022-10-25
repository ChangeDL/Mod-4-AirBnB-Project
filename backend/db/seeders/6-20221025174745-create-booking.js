'use strict';

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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: '2025-10-23',
        endDate: '2025-10-25'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2025-11-24',
        endDate: '2025-11-25'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2025-10-24',
        endDate: '2025-10-25'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2025-11-24',
        endDate: '2025-11-25'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2025-9-24',
        endDate: '2025-9-25'
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
  }
};
