const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(authMiddleware(), validate(productValidation.createProduct), productController.createProduct)
  .get(authMiddleware(), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(authMiddleware(), validate(productValidation.getProduct), productController.getProduct)
  .patch(authMiddleware(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(authMiddleware(), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
