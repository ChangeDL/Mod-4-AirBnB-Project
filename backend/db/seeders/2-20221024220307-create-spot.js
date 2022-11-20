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
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 63.18414,
        lng: -10.45119,
        name: "Demo's Crib",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: 205
      },
      {
        ownerId: 2,
        address: '24496 sw 18th ave',
        city: 'HollyWoo',
        state: 'California',
        country: 'United States',
        lat: 16663.18454,
        lng: 10.475619,
        name: 'BoJack Horseman Estate',
        description: "Back in the 90s I was in a very famous TV show I'm BoJack the horse (BoJack) BoJack the horse Don't act like you don't know And I'm trying to hold on to my past It's been so long I don't think I'm gonna last I guess I'll just try And make you understand That I'm more horse than a man Or I'm more man than a horse BoJack",
        price: 699
      },
      {
        ownerId: 2,
        address: '29553246 sw 18th ave',
        city: 'Gwinn',
        state: 'Michigan',
        country: 'United States',
        lat: 14363.18454,
        lng: 10.4509619,
        name: 'For The Boys',
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
        price: 500
      },
      {
        ownerId: 3,
        address: '224324396 sw 18th ave',
        city: 'Jacksonville',
        state: 'Florida',
        country: 'United States',
        lat: 163.184354,
        lng: 1430.45619,
        name: 'Jacks Fine Dine Shack',
        description: 'Come on down and dine in my shack, we should have room for you.... I think',
        price: 40
      },
      {
        ownerId: 3,
        address: '295356 sw 1853th ave',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Pitts Dungeon Pit',
        description: "Kyle Pitts can't be fantasy relevant for his life, so come jump into the pit of despair that is drafting him in fantasy football and ruining your season (Price required or else it would've been free)",
        price: 1
      },
      {
        ownerId: 1,
        address: '123 45th ave',
        city: 'Cleveland',
        state: 'Ohio',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Lebron James Childhood Home',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 800
      },
      {
        ownerId: 1,
        address: '456 78th ave',
        city: 'Baltimore',
        state: 'Maryland',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Johnson and Jonson BnB',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 68
      },
      {
        ownerId: 1,
        address: '123 12th st',
        city: 'Orlando',
        state: 'Florida',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'BnB a Walk a way from Disney',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 235
      },
      {
        ownerId: 1,
        address: '123 23rd lane',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'The Stars At Night Are Very Bright',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 45
      },
      {
        ownerId: 1,
        address: '123 13th dr',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'I wish I lived here',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 382
      },
      {
        ownerId: 1,
        address: '123 21st blvd',
        city: 'Boston',
        state: 'Massachusetts',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Your Cousin From Boston',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 12
      },
      {
        ownerId: 1,
        address: '180 Geary St Fl 6',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'App Academy',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 111
      },
      {
        ownerId: 1,
        address: '123 321st st',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Thinking of spot names is hard',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 231
      },
      {
        ownerId: 1,
        address: '321 1st ave',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Dame Time',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 259
      },
      {
        ownerId: 1,
        address: '213 2nd ave',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Concrete Jungle Wet Dream Tomato',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 387
      },
      {
        ownerId: 1,
        address: '121 1st dr',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Snowy Peak Inn',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 589
      },
      {
        ownerId: 1,
        address: '1321 2nd dr',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'West Coast Is Best Coast',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 892
      },
      {
        ownerId: 1,
        address: '1 123rd ave',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Mardi Gra Party House',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 291
      },
      {
        ownerId: 1,
        address: '2 1st st',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Texas Really Is Huge',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 1200
      },
      {
        ownerId: 1,
        address: '3 1st dr',
        city: 'Nashville',
        state: 'Tennesse',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: "BnB Next To Rock n' Roll Hall Of Fame",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 620
      },
      {
        ownerId: 1,
        address: '4 1st ave',
        city: 'Houston',
        state: 'Texas',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'So Many Major Cities In Texas',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 326
      },
      {
        ownerId: 1,
        address: '5 1st dr',
        city: 'Philadelphia',
        state: 'Pennsylvania',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Fly Eagle Fly',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 423
      },
      {
        ownerId: 1,
        address: '6 1st st',
        city: 'Minneapolis',
        state: 'Minnesota',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: 'Quiet Neighborhood Near Mall Of America',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 514
      },
      {
        ownerId: 1,
        address: '7 1st dr',
        city: 'San Antonio',
        state: 'Texas',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: "Another Texas City Who Would've thought",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 100
      },
      {
        ownerId: 1,
        address: '626 Experiment Dr',
        city: 'Honolulu',
        state: 'Hawaii',
        country: 'United States',
        lat: 163.184554,
        lng: 10.4561779,
        name: "Lilo & Stitch's Safe House For Lost Experiments",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 626
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
