const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const allReviewsByUser = await Review.findAll({
        where: {
            userId: req.user
        }
    })
    res.json(allReviewsByUser)
})



module.exports = router;
