const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')

const router = express.Router();



router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    const errorObj = {}

    if (page.length < 1) errorObj.page = 'Page must be greater than or equal to 1'
    if (size.length < 1) errorObj.size = 'Size must be greater than or equal to 1'
    if (maxLat % 1 === 0) errorObj.maxLat = 'Maximum latitude is invalid'
    if (minLat % 1 === 0) errorObj.minLat = 'Minimum latitude is invalid'
    if (maxLng % 1 === 0) errorObj.maxLng = 'Maximum longitude is invalid'
    if (minLng % 1 === 0) errorObj.minLng = 'Minimum longitude is invalid'
    if (minPrice < 0) errorObj.minPrice = 'Minimum price must be greater than or equal to 0'
    if (maxPrice < 0) errorObj.maxPrice = 'Maximum price must be greater than or equal to 0'


    if (Object.keys(errorObj).length > 0) {
        res.status(400)
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: errorObj
        })
    }

    if (!page || +page > 10 || !Number.isInteger(+page)) page = 1
    if (!size || +size > 20 || !Number.isInteger(+size)) size = 20



    let limit = +size
    let offset = +size * (+page - 1)


    const spotsObj = {}
    const allSpots = await Spots.findAll({
        subQuery: false,
        include: [
            { model: Review, attributes: [] }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('Reviews.stars')), 1),
                    'avgRating'
                ],
            ]
        },
        group: ['Spots.id'],
        limit,
        offset,
    });

    for (let i = 0; i < allSpots.length; i++) {
        const spotIds = allSpots[i].dataValues.id
        allSpots[i].dataValues.lat = +allSpots[i].dataValues.lat
        allSpots[i].dataValues.lng = +allSpots[i].dataValues.lng
        allSpots[i].dataValues.price = +allSpots[i].dataValues.price
        allSpots[i].dataValues.avgRating = +allSpots[i].dataValues.avgRating

        const previewImageCheck = await SpotImages.findOne({
            where: {
                spotId: spotIds,
            }
        })
        if (!previewImageCheck) allSpots[i].dataValues.previewImage = 'No Preview Image Set For This Spot'
        else if (previewImageCheck.preview === true) {
            allSpots[i].dataValues.previewImage = previewImageCheck.url
        } else {
            allSpots[i].dataValues.previewImage = 'No Preview Image Set For This Spot'
        }
    }
    spotsObj.Spots = allSpots
    spotsObj.page = +page
    spotsObj.size = +size
    res.json(spotsObj)
})

router.get('/current', requireAuth, async (req, res) => {
    const spotsObj = {}
    const userSpots = await Spots.findAll({
        where: {
            ownerId: req.user.id
        },

        include: [
            { model: Review, attributes: [] }
        ],
        attributes: {
            include: [
                [
                    sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('Reviews.stars')), 1),
                    'avgRating'
                ],
            ]
        },
        group: ['Spots.id']
    })

    for (let i = 0; i < userSpots.length; i++) {
        const spotIds = userSpots[i].dataValues.id
        userSpots[i].dataValues.lat = +userSpots[i].dataValues.lat
        userSpots[i].dataValues.lng = +userSpots[i].dataValues.lng
        userSpots[i].dataValues.price = +userSpots[i].dataValues.price
        userSpots[i].dataValues.avgRating = +userSpots[i].dataValues.avgRating
        const previewImageCheck = await SpotImages.findOne({
            where: {
                spotId: spotIds,
            }
        })
        if (!previewImageCheck) userSpots[i].dataValues.previewImage = 'No Preview Image Set For This Spot'
        else if (previewImageCheck.preview === true) {
            userSpots[i].dataValues.previewImage = previewImageCheck.url
        } else {
            userSpots[i].dataValues.previewImage = 'No Preview Image Set For This Spot'
        }
    }
    spotsObj.Spots = userSpots
    res.json(spotsObj)
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
        spotId: +req.params.spotId,
        url,
        preview
    })
    res.json(imageForSpot);
})

router.get('/:spotId/reviews', async (req, res) => {
    const reviewObj = {}
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
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImages,
                attributes: ['id', 'url']
            }
        ],

    })
    reviewObj.Reviews = reviewsForSpot
    res.json(reviewObj)
})

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const errorObj = {}
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

    const checkIfUserLeftReviewAlready = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })

    if (checkIfUserLeftReviewAlready) {
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    if (!review) errorObj.review = "Review text is required"

    if (stars < 1 || stars > 5 || !stars) errorObj.stars = "Stars must be an integer from 1 to 5"

    if (Object.keys(errorObj).length > 0) {
        res.status(400)
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: errorObj
        })
    }
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: +req.params.spotId,
        review,
        stars
    })
    res.json(newReview)
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const bookingsObj = {}
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
        bookingsObj.Bookings = bookingsForSpot
        res.json(bookingsObj)
    }
    if (req.user.id === currentSpot.ownerId) {
        const bookingsForSpot = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] }
            ]
        })
        bookingsObj.Bookings = bookingsForSpot
        res.json(bookingsObj)
    }
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
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

    const formatStartDate = new Date(startDate)
    const formatEndDate = new Date(endDate)


    if (req.user.id !== currentSpot.ownerId) {
        const findIfTimeHasAlreadyBeenBookedForSpot = await Booking.findAll({
            where: { spotId: req.params.spotId }
        })

        const errorObj = {}

        for (let i = 0; i < findIfTimeHasAlreadyBeenBookedForSpot.length; i++) {
            const startDatesForBookings = (findIfTimeHasAlreadyBeenBookedForSpot[i].startDate)
            const endDatesForBookings = (findIfTimeHasAlreadyBeenBookedForSpot[i].endDate)
            if (startDatesForBookings.toDateString() === formatStartDate.toDateString()) errorObj.startDate = "Start date conflicts with an existing booking"
            if (endDatesForBookings.toDateString() === formatEndDate.toDateString()) errorObj.endDate = "End date conflicts with an existing booking"
        }

        if (Object.keys(errorObj).length > 0) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: errorObj
            })
        }



        if ((startDate >= endDate) === true) {
            res.status(403);
            return res.json({
                message: "End Date cannot be on or before Start Date",
                statusCode: 403
            })
        }
        const bookingForSpot = await Booking.create({
            spotId: +req.params.spotId,
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
        { model: User.scope("spotDetailsUser", "defaultScope"), as: 'Owner' },
        { model: Review, attributes: [] }],
        attributes: {
            include: [
                [
                    sequelize.fn('COUNT', sequelize.col('Reviews.id')),
                    'numReviews'
                ],
                [
                    sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('Reviews.stars')), 1),
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
    requestedSpot.dataValues.lat = +requestedSpot.dataValues.lat
    requestedSpot.dataValues.lng = +requestedSpot.dataValues.lng
    requestedSpot.dataValues.price = +requestedSpot.dataValues.price
    requestedSpot.dataValues.numReviews = +requestedSpot.dataValues.numReviews
    requestedSpot.dataValues.avgRating = +requestedSpot.dataValues.avgRating
    res.json(requestedSpot)
});

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const errorObj = {}

    if (!address) errorObj.address = "Street address is required"
    if (!city) errorObj.city = "City is required"
    if (!state) errorObj.state = "State is required"
    if (!lat || (+lat % 1 === 0)) errorObj.lat = "Latitude is not valid"
    if (!lng || (+lng % 1 === 0)) errorObj.lng = "Longitude is not valid"
    if (!name || name.length > 50) errorObj.name = "Name must be more then 1 character and less than 50 characters"
    if (!description) errorObj.description = "Description is required"
    if (!price) errorObj.price = "Price per day is required"

    if (Object.keys(errorObj).length > 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: errorObj
        })
    }

    const newSpot = await Spots.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat: +lat,
        lng: +lng,
        name,
        description,
        price: +price
    })
    res.json(newSpot)
})


router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const errorObj = {}

    if (!address) errorObj.address = "Street address is required"
    if (!city) errorObj.city = "City is required"
    if (!state) errorObj.state = "State is required"
    if (!lat || (+lat % 1 === 0)) errorObj.lat = "Latitude is not valid"
    if (!lng || (+lng % 1 === 0)) errorObj.lng = "Longitude is not valid"
    if (!name || name.length > 50) errorObj.name = "Name must be more then 1 character and less than 50 characters"
    if (!description) errorObj.description = "Description is required"
    if (!price) errorObj.price = "Price per day is required"

    if (Object.keys(errorObj).length > 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: errorObj
        })
    }
    const requestedSpot = await Spots.scope('updateSpot').findOne({
        where: {
            id: req.params.spotId
        },
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
    })
    if (!requestedSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (requestedSpot.ownerId !== req.user.id) {
        res.status(401);
        return res.json({
            message: "You're not the owner of this spot.",
            statusCode: 401
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

    if (requestedSpot.ownerId !== req.user.id) {
        res.status(401);
        return res.json({
            message: "You're not the owner of this spot",
            statusCode: 401
        })
    }
    requestedSpot.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router;
