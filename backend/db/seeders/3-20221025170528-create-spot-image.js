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
        preview: true
      },
      {
        spotId: 3,
        url: 'https://info.londonbay.com/hubfs/Home-Opt-2022/post-1-feature-opt.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://img1.wsimg.com/isteam/ip/6693ea46-5a80-4552-a0c1-1f8b4249d3b8/66F8C65E-BE4F-4C3D-BE95-58230E30DE76.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://media.istockphoto.com/id/1332054254/photo/a-deep-hole-is-dug-in-the-ground-a-sinkhole-in-the-ground.jpg?b=1&s=170667a&w=0&k=20&c=DLI1A67nzyY46in8Xf4l6oGLTOHM7_Zs-zRp366oQwM=',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://images.familyhomeplans.com/cdn-cgi/image/fit=contain,quality=100/plans/52961/52961-b1200.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://www.neighbor.com/storage-blog/wp-content/uploads/2020/03/AdobeStock_89298214-min_8421efb06b9d433a6f2f17d886703510_2000.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://nimvo.com/wp-content/uploads/2018/11/single-family-detached-home-750x503.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gothic-revival-house-1515702446.jpg?crop=0.921xw:1.00xh;0.0401xw,0&resize=480:*',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://images.adsttc.com/media/images/61b1/016a/f91c/810c/6900/000f/large_jpg/Art-Moderne-House-Style.jpg?1638990167',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://images.adsttc.com/media/images/61aa/5259/f91c/81f5/aa00/000d/newsletter/Greek-Revival-House-Style.jpg?1638552133',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://www.neighbor.com/storage-blog/wp-content/uploads/2020/03/AdobeStock_279953994-min_b79f7a5994a23752182823d94703b869_800.jpeg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://www.everythingoverseas.com/wp-content/uploads/2017/10/GettyImages-157382018.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://s.yimg.com/ny/api/res/1.2/kBCHmqWU7iet1OsQMduIIw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ2MQ--/https://media.zenfs.com/en-US/homerun/elle_decor_817/7aab5e3cd1404f4ec0b304ea9b8c218b',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://www.luxxu.net/blog/wp-content/uploads/2017/02/20-Incredible-Modern-Houses-Around-the-United-States-5-850x410.jpg',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://s.yimg.com/ny/api/res/1.2/Xtm12TIZemidJCmpM5vPNA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03NDM-/https://media.zenfs.com/en-US/homerun/elle_decor_817/b73eb223fa1c4c18a6a614de7786bed0',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://images.adsttc.com/media/images/61aa/5249/f91c/812d/7e00/000f/newsletter/Georgian-Colonial-Style.jpg?1638552116',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://i.insider.com/59d4f226351aa743008b4aae?width=1000&format=jpeg&auto=webp',
        preview: true
      },
      {
        spotId: 20,
        url: 'http://www.luxxu.net/blog/wp-content/uploads/2017/02/20-Incredible-Modern-Houses-Around-the-United-States-9.jpg',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://media-cdn.trulia-local.com/neighborhood-media-service-prod/ma/boston/hyde-park/1269-ma_bos_hyde_park_154775_23_500x_cfit.jpg',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://www.travelandleisure.com/thmb/MuDxjKJUcAzdDSGqYI3zoCvdo48=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/winchester-mystery-house-san-jose-HAUNTEDHOUSE1019-dcf1a255a3a14ab88ce1bd7ee38f900b.jpg',
        preview: true
      },
      {
        spotId: 23,
        url: 'https://img.jamesedition.com/listing_images/2022/01/28/16/50/11/07cd1d16-5563-4bf9-b007-9a4564554313/je/1000x620xc.jpg',
        preview: true
      },
      {
        spotId: 24,
        url: 'https://assets-news.housing.com/news/wp-content/uploads/2022/01/11172338/World%E2%80%99s-15-Most-Beautiful-Houses-That-Will-Leave-You-Awestruck-featured-shutterstock_1182743467-1200x700-compressed.jpg',
        preview: true
      },
      {
        spotId: 25,
        url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1278i215%2F5gf91rr6e83h4ytj8st0v9aqy1i215&option=N&h=472&permitphotoenlargement=false',
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
