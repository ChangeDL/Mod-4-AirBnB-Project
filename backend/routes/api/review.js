const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');

const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const allReviewsByUser = await Review.findAll({
        where: {
            userId: req.user.id
        }
    })
    res.json(allReviewsByUser)
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const reviewToAddImageTo = await Review.findOne({
        where: { id: req.params.reviewId }
    })
    if (!reviewToAddImageTo) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    const newImageForReview = await ReviewImages.create({
        reviewId: req.params.reviewId,
        url
    })
    res.json(newImageForReview)
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const reviewToEdit = await Review.findOne({ where: { id: req.params.reviewId } })

    if (!reviewToEdit) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    reviewToEdit.update({

        review,
        stars,
    })
    res.json(reviewToEdit)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewToDelete = await Review.findOne({ where: { id: req.params.reviewId } })
    if (!reviewToDelete) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    reviewToDelete.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;