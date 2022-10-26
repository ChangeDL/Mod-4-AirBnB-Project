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
        address: '10 nw 10th st',
        city: 'Broke Hines',
        state: 'Flor-ida',
        country: 'United States',
        lat: 63.18414,
        lng: -10.45119,
        name: 'My Childhood Home',
        description: 'I grew up here',
        price: 205.69
      },
      {
        ownerId: 2,
        address: '24496 sw 18th ave',
        city: 'Pemke Pies',
        state: 'Florida',
        country: 'United States',
        lat: 16663.18454,
        lng: 10.475619,
        name: 'Home',
        description: 'ere',
        price: 699.69
      },
      {
        ownerId: 2,
        address: '29553246 sw 18th ave',
        city: 'Pemke Pies',
        state: 'Florida',
        country: 'United States',
        lat: 14363.18454,
        lng: 10.4509619,
        name: 'Home',
        description: 'ere',
        price: 699.69
      },
      {
        ownerId: 3,
        address: '224324396 sw 18th ave',
        city: 'Pemke Pies',
        state: 'Florida',
        country: 'United States',
        lat: 163.184354,
        lng: 1430.45619,
        name: 'Home',
        description: 'ere',
        price: 699.69
      },
      {
        ownerId: 3,
        address: '295356 sw 1853th ave',
        city: 'Pemke Pies',
        state: 'Florida',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
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
