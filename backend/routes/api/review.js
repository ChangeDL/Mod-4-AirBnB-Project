const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spots, SpotImages, Review, User, sequelize } = require('../../db/models');
const { check } = require('express-validator');

const router = express.Router();





module.exports = router;
