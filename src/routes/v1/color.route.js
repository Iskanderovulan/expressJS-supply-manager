const express = require('express');
const validate = require('../../middlewares/validate');
const colorValidation = require('../../validations/color.validation');
const colorController = require('../../controllers/color.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(authMiddleware(), validate(colorValidation.createColor), colorController.createColor)
  .get(authMiddleware(), validate(colorValidation.getColors), colorController.getColors);

router
  .route('/:colorId')
  .get(authMiddleware(), validate(colorValidation.getColor), colorController.getColor)
  .patch(authMiddleware(), validate(colorValidation.updateColor), colorController.updateColor)
  .delete(authMiddleware(), validate(colorValidation.deleteColor), colorController.deleteColor);

module.exports = router;
