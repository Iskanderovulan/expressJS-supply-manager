const express = require('express');
const { fetchStatistics } = require('../../controllers/stats.controller');
const authMiddleware = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const statsValidation = require('../../validations/stats.validation');

const router = express.Router();

router.route('/').get(authMiddleware(), validate(statsValidation.getStatistics), fetchStatistics);

module.exports = router;
