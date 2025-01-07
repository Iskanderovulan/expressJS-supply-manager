const express = require('express');
const validate = require('../../middlewares/validate');
const packValidation = require('../../validations/pack.validation');
const packController = require('../../controllers/pack.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(authMiddleware(), validate(packValidation.createPack), packController.createPack)
  .get(authMiddleware(), validate(packValidation.getPacks), packController.getPacks);

router
  .route('/:packId')
  .get(authMiddleware(), validate(packValidation.getPack), packController.getPack)
  .patch(authMiddleware(), validate(packValidation.updatePack), packController.updatePack)
  .delete(authMiddleware(), validate(packValidation.deletePack), packController.deletePack);

module.exports = router;
