const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
    const reviewObj = {}
    const allReviewsByUser = await Review.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spots, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price'] },
            { model: ReviewImages, attributes: ['id', 'url'] }
        ],
        where: {
            userId: req.user.id
        }
    })

    for (let i = 0; i < allReviewsByUser.length; i++) {
        const spotIds = (allReviewsByUser[i].spotId)
        allReviewsByUser[i].Spot.dataValues.lat = +allReviewsByUser[i].Spot.dataValues.lat
        allReviewsByUser[i].Spot.dataValues.lng = +allReviewsByUser[i].Spot.dataValues.lng
        allReviewsByUser[i].Spot.dataValues.price = +allReviewsByUser[i].Spot.dataValues.price


        const previewImageCheck = await SpotImages.findOne({
            where: {
                spotId: spotIds,
            }
        })

        if (!previewImageCheck) allReviewsByUser[i].Spot.dataValues.previewImage = 'No Preview Image Set For This Spot'
        else if (previewImageCheck.preview === true) {
            allReviewsByUser[i].Spot.dataValues.previewImage = previewImageCheck.url
        } else {
            allReviewsByUser[i].Spot.dataValues.previewImage = 'No Preview Image Set For This Spot'
        }
    }
    reviewObj.Reviews = allReviewsByUser
    res.json(reviewObj)
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

    const imageOnReviewLimitCheck = await ReviewImages.findAll({
        where: { reviewId: req.params.reviewId }
    })
    if (imageOnReviewLimitCheck.length === 10) {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
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
    const errorObj = {}
    const reviewToEdit = await Review.findOne({ where: { id: req.params.reviewId } })

    if (!reviewToEdit) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
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

    if (reviewToEdit.userId !== req.user.id) {
        res.status(401);
        return res.json({
            message: "You're not the User who created this review.",
            statusCode: 401
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

    if (reviewToDelete.userId !== req.user.id) {
        res.status(401);
        return res.json({
            message: "You're not the user who created this review",
            statusCode: 401
        })
    }
    reviewToDelete.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;
