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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://www.thehousedesigners.com/images/plans/HDS/bulk/7383/4093-Direct-front-option-final_03.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://imageio.forbes.com/specials-images/imageserve/61153c0d7b42cc5060baf9b8/House-in-Florida/960x0.jpg?format=jpg&width=960',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://info.londonbay.com/hubfs/Home-Opt-2022/post-1-feature-opt.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.tropicalfcu.com/hubfs/Beautiful%20South%20Florida%20home.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=contain,quality=100/plans/52961/52961-b1200.jpg',
        preview: true
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
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
