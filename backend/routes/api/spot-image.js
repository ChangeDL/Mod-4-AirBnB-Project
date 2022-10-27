const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    res.json('test')
})


module.exports = router;
