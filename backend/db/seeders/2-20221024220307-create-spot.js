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
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '19170 nw 19th st',
        city: 'Pembroke Pines',
        state: 'Florida',
        country: 'United States',
        lat: 63.18414,
        lng: -10.45119,
        name: 'My Childhood Home',
        description: 'I grew up here',
        price: 205.69
      },
      {
        ownerId: 1,
        address: '296 sw 18th ave',
        city: 'Pembroke Pines',
        state: 'Florida',
        country: 'United States',
        lat: 163.18454,
        lng: 10.45619,
        name: 'Home',
        description: 'ere',
        price: 699.69
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Spots', {
      ownerId: 1
    })
  }
};
