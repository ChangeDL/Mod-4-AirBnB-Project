const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', async (req, res) => {
    const allSpots = await Spots.findAll({
        include: [{ model: SpotImages, where: { preview: true }, attributes: [] },
        { model: Review, attributes: [] }],
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating'
                ],
                [sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spots.id', 'SpotImages.url']
    });
    res.json(allSpots)
})

router.get('/current', requireAuth, async (req, res) => {
    const UserSpots = await Spots.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{ model: SpotImages, where: { preview: true }, attributes: [] },
        { model: Review, attributes: [] }],
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating'
                ],
                [sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spots.id', 'SpotImages.url']
    })
    res.json(UserSpots)
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body
    const requestedSpot = await Spots.findOne({
        where: {
            id: req.params.spotId
        }
    })
    if (!requestedSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const imageForSpot = await SpotImages.create({
        spotId: req.params.spotId,
        url,
        preview
    })
    res.json(imageForSpot);
})

router.get('/:spotId', async (req, res) => {
    const requestedSpot = await Spots.findOne({
        where: {
            id: req.params.spotId
        },
        include: [{ model: SpotImages, as: 'SpotImages' },
        { model: User, as: 'Owner' },
        { model: Review, attributes: [] }],
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating'
                ]
            ]
        },
        group: ['Spots.id', 'SpotImages.url']
    })
    if (!requestedSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    res.json(requestedSpot)
});

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spots.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(newSpot)
})


router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const requestedSpot = await Spots.scope('updateSpot').findOne({
        where: {
            id: req.params.spotId
        }
    })
    if (!requestedSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    await requestedSpot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.json(requestedSpot)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const requestedSpot = await Spots.scope('updateSpot').findOne({
        where: {
            id: req.params.spotId
        }
    })
    if (!requestedSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    requestedSpot.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;
