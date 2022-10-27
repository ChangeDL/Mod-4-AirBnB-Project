const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImageToBeDeleted = await ReviewImages.findOne({
        where: { id: req.params.imageId },
        attributes: ['id', 'reviewId']
    })

    if (!reviewImageToBeDeleted) {
        res.status(404);
        return res.json({
            message: "Image couldn't be found",
            statusCode: 404
        })
    }
    const reviewWhereImageIsLocated = await Review.findOne({
        where: { id: reviewImageToBeDeleted.reviewId }
    })

    if (reviewWhereImageIsLocated.userId !== req.user.id) {
        res.status(401);
        return res.json({
            message: "You did not upload this image.",
            statusCode: 401
        })
    }
    reviewImageToBeDeleted.destroy();

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router;
