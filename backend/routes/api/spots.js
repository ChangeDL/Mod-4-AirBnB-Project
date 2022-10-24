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

module.exports = router;
