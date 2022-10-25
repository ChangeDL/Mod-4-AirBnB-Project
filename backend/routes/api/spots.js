const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spots.findAll();
    res.json(spots)
})

router.get('/current', requireAuth, async (req, res) => {
    const UserSpots = await Spots.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    res.json(UserSpots)
})

router.get('/:spotId', async (req, res) => {
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
