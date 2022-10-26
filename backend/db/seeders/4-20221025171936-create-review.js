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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: "this is a test revfesfiew",
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: "this isedfses a test review",
        stars: 3
      },
      {
        spotId: 3,
        userId: 2,
        review: "this issfeg a test review",
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: "this is afsfsf test review",
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: "this is sdgsfa test review",
        stars: 4
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
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2] }
    }, {});
  }
};
