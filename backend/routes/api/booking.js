const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const Bookingsobj = {}
    const usersBookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Spots,
                attributes: ['id', 'ownerId', 'address', 'city', 'country', 'lat', 'lng', 'name', 'price']
            },

        ]
    })
    for (let i = 0; i < usersBookings.length; i++) {
        const spotIds = usersBookings[i].dataValues.id

        usersBookings[i].Spot.dataValues.lat = +usersBookings[i].Spot.dataValues.lat
        usersBookings[i].Spot.dataValues.lng = +usersBookings[i].Spot.dataValues.lng
        usersBookings[i].Spot.dataValues.price = +usersBookings[i].Spot.dataValues.price


        const previewImageCheck = await SpotImages.findOne({
            where: {
                spotId: spotIds,
            }
        })
        if (!previewImageCheck) usersBookings[i].dataValues.Spot.dataValues.previewImage = 'No Preview Image Set For This Spot'
        else if (previewImageCheck.preview === true) {
            usersBookings[i].dataValues.Spot.dataValues.previewImage = previewImageCheck.url
        } else {
            usersBookings[i].dataValues.Spot.dataValues.previewImage = 'No Preview Image Set For This Spot'
        }
    }

    Bookingsobj.Bookings = usersBookings
    res.json(Bookingsobj)
})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const currentBooking = await Booking.findOne({
        where: { id: req.params.bookingId }
    })
    if (!currentBooking) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== currentBooking.userId) {
        res.status(400);
        return res.json({
            message: "You're not the one who made this booking, please sign into the correct account to edit",
            statusCode: 400
        })
    }

    let currentDate = new Date();
    currentDate = (currentDate.toJSON().split('T0')[0])

    if ((currentDate > endDate) === true) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }
    if ((startDate >= endDate) === true) {
        res.status(403);
        return res.json({
            message: "End Date cannot be on or before Start Date",
            statusCode: 403
        })
    }

    const formatStartDate = new Date(startDate)
    const formatEndDate = new Date(endDate)

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



    currentBooking.update({
        startDate,
        endDate
    })
    res.json(currentBooking)
})


router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingToBeDeleted = await Booking.findOne({
        where: { id: req.params.bookingId }
    })
    if (!bookingToBeDeleted) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    const spotWithBooking = await Spots.findOne({
        where: { id: bookingToBeDeleted.spotId }
    })
    if (req.user.id !== bookingToBeDeleted.userId && req.user.id !== spotWithBooking.ownerId) {
        res.status(400);
        return res.json({
            message: "You're not the one who made this booking, or the owner of the spot. Please login into the correct account to delete",
            statusCode: 400
        })
    }
    spotWithBooking.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
