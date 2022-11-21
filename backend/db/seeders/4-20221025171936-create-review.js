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
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 1,

        userId: 3,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 1,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 1,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },

      {
        spotId: 2,
        userId: 1,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 2,

        userId: 3,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 1

      },



      {

        spotId: 2,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 2,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 2

      },

      {
        spotId: 3,
        userId: 1,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 3,

        userId: 3,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 3,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 3,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 4

      },

      {
        spotId: 4,
        userId: 1,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 4,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 4,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 4,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 2

      },

      {
        spotId: 5,
        userId: 1,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 5,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 1

      },



      {

        spotId: 5,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 5,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },

      {
        spotId: 6,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 6,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 6,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 6,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 2

      },
      //***************************************************************************************************** */
      {
        spotId: 7,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 7,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 7,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 7,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 8,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 8,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 8,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 8,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 9,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 9,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 9,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 9,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 2

      },
      //***************************************************************************************************** */
      {
        spotId: 10,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 10,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 10,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 10,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 11,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 3
      },



      {

        spotId: 11,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 11,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 11,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 4

      },
      //***************************************************************************************************** */
      {
        spotId: 12,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 12,

        userId: 2,

        review: "This place taught me everything I know",

        stars: 5

      },



      {

        spotId: 12,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 12,

        userId: 5,

        review: "Hopefully this helps me find a career",

        stars: 5

      },
      //***************************************************************************************************** */
      {
        spotId: 13,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 13,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 13,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 13,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 14,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 14,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 14,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 14,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 15,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 15,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 1

      },



      {

        spotId: 15,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 15,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 2

      },
      //***************************************************************************************************** */
      {
        spotId: 16,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 16,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 4

      },



      {

        spotId: 16,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 16,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 4

      },
      //***************************************************************************************************** */
      {
        spotId: 17,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 17,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 17,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 17,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 18,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 18,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 18,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 18,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 4

      },
      //***************************************************************************************************** */
      {
        spotId: 19,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 19,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 19,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 19,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 4

      },
      //***************************************************************************************************** */
      {
        spotId: 20,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 20,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 20,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 20,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 21,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 21,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 1

      },



      {

        spotId: 21,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 21,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 2

      },
      //***************************************************************************************************** */
      {
        spotId: 22,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 22,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 22,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 22,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 23,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 23,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 23,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 23,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 4

      },
      //***************************************************************************************************** */
      {
        spotId: 24,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 4
      },



      {

        spotId: 24,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 3

      },



      {

        spotId: 24,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 4
      },


      {

        spotId: 24,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

      },
      //***************************************************************************************************** */
      {
        spotId: 25,
        userId: 3,
        review: "Lovely place, really enjoyed the area and neighborhood, definitely would stay here again",
        stars: 5
      },



      {

        spotId: 25,

        userId: 2,

        review: "Place was okay I guess, not much provided at the house and had no towels or wash clothes available, luckily brought my own",

        stars: 2

      },



      {

        spotId: 25,

        userId: 4,

        review: "Beautiful place, really enjoyed the scenery around the house.Not too noisy, definitely would stay here again",

        stars: 5
      },


      {

        spotId: 25,

        userId: 5,

        review: "Not to bad, not too good but I enjoyed my stay and had very minimal problems ",

        stars: 3

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
