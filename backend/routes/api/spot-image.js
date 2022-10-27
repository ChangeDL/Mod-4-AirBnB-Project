const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, ReviewImages, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageToBeDeleted = await SpotImages.findOne(
        {
            where:
                { id: req.params.imageId }
        }
    )
    if (!imageToBeDeleted) {
        res.status(404);
        return res.json({
            message: "Image couldn't be found",
            statusCode: 404
        })
    }
    const spotWhereImageIs = await Spots.findOne({
        where: {
            id: imageToBeDeleted.spotId
        }
    })
    if (spotWhereImageIs.ownerId !== req.user.id) {
        res.status(401);
        return res.json({
            message: "You do not own this spot.",
            statusCode: 401
        })
    }
    imageToBeDeleted.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router;
