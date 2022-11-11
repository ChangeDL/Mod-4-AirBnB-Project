const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .notEmpty()
        .withMessage('Must input a First Name'),
    check('lastName')
        .notEmpty()
        .withMessage('Must input a Last Name'),
    handleValidationErrors,
];

//signup
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const errorObj = {}

        if (!email) errorObj.email = 'Invalid email'
        if (!username) errorObj.username = 'Username is required'
        if (!lastName) errorObj.lastName = 'Last Name is required'
        if (!lastName) errorObj.lastName = 'First Name is required'

        if (Object.keys(errorObj).length > 0) {
            res.status(400)
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: errorObj
            })
        }

        const checkIfEmailAlreadyExist = await User.findOne({ where: { email: email } })
        if (checkIfEmailAlreadyExist) {
            res.status(403);
            return res.json({
                message: "Account with this email already exist, please use a different one",
                statusCode: 403
            })
        }
        const checkIfUserNameExist = await User.findOne({ where: { username: username } })
        if (checkIfUserNameExist) {
            res.status(403);
            return res.json({
                message: "Account with this username already exist, please use a different one",
                statusCode: 403
            })
        }

        const user = await User.signup({ email, username, password, firstName, lastName });

        const token = await setTokenCookie(res, user);
        user.dataValues.token = token

        return res.json(
            user
        );
    }
);

module.exports = router;
