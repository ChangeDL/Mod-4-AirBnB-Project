const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { Op } = require('sequelize')

const router = express.Router();

router.get('/', async (req, res) => {
    const allSpots = await Spots.findAll({
        subQuery: false,
        include: [
            { model: SpotImages, attributes: [] },
            { model: Review, attributes: [] }
        ],
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
    console.log(allSpots)
    res.json(allSpots)
})

router.get('/current', requireAuth, async (req, res) => {
    const UserSpots = await Spots.findAll({
        where: {
            ownerId: req.user.id
        },

        include: [
            { model: SpotImages, attributes: [] },
            { model: Review, attributes: [] }
        ],
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

router.get('/:spotId/reviews', async (req, res) => {
    const spotCheck = await Spots.findOne({ where: { id: req.params.spotId } })
    if (!spotCheck) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const reviewsForSpot = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User
            },
            {
                model: ReviewImages
            }
        ],

    })
    res.json(reviewsForSpot)
})

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const requestedSpot = await Spots.findOne({
        where: { id: req.params.spotId }
    })
    if (!requestedSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })
    res.json(newReview)
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const currentSpot = await Spots.findOne({
        where: { id: req.params.spotId }
    })

    if (!currentSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (req.user.id !== currentSpot.ownerId) {
        const bookingsForSpot = await Booking.findAll({
            where: { spotId: req.params.spotId }
        })
        res.json(bookingsForSpot)
    }
    if (req.user.id === currentSpot.ownerId) {
        const bookingsForSpot = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] }
            ]
        })
        res.json(bookingsForSpot)
    }
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const currentSpot = await Spots.findOne({
        where: { id: req.params.spotId }
    })

    if (!currentSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (req.user.id !== currentSpot.ownerId) {
        const { startDate, endDate } = req.body
        // const checkIfAlreadyBooked = await Booking.findAll({
        //     where: {
        //         spotId: req.params.spotId,
        //         startDate
        //     },

        // })
        // console.log('***********testing: ', checkIfAlreadyBooked)

        const bookingForSpot = await Booking.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate,
            endDate,
        })
        res.json(bookingForSpot)
    }
    if (req.user.id === currentSpot.ownerId) {
        res.status(404);
        return res.json({
            message: "You own this spot silly so you can't book it.",
            statusCode: 404
        })
    }
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

        group: ['Spots.id', 'SpotImages.id', 'Owner.id'],

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
