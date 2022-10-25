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
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'Test.url'
      },
      {
        reviewId: 1,
        url: 'Test.url'
      },
      {
        reviewId: 3,
        url: 'Test.url'
      },
      {
        reviewId: 2,
        url: 'Test.url'
      },
      {
        reviewId: 1,
        url: 'Test.url'
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewsImages', {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
