// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewRouter = require('./review.js');
const bookingRouter = require('./booking.js');
const spotImageRouter = require('./spot-image.js');
const reviewImageRouter = require('./review-image.js');
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require('../../utils/auth.js');
router.use(restoreUser);

router.get('/test', requireAuth, (req, res) => {
    res.json({ message: 'success' })
})

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingRouter);

router.use('/spot-images', spotImageRouter);

router.use('/review-images', reviewImageRouter);




router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
});


router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);
module.exports = router;
