'use strict';
const bcrypt = require("bcryptjs");

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
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Lition'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Demo',
        lastName: 'Lition'
      },
      {
        email: 'userd2@user.io',
        username: 'FakeUfser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Defmo',
        lastName: 'Liftion'
      },
      {
        email: 'usegwer2@user.io',
        username: 'FakewefUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Dewefmo',
        lastName: 'Lifewtion'
      },
      {
        email: 'uwefser2@user.io',
        username: 'FakewfeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Deefmo',
        lastName: 'Lieftion'
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
