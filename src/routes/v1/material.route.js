const express = require('express');
const validate = require('../../middlewares/validate');
const materialValidation = require('../../validations/material.validation');
const materialController = require('../../controllers/material.controller');
const authMiddleware = require('../../middlewares/auth'); // Добавляем middleware для проверки токена

const router = express.Router();

router
  .route('/')
  .post(
    authMiddleware(), // Проверка токена
    validate(materialValidation.createMaterial),
    materialController.createMaterial
  )
  .get(
    authMiddleware(), // Проверка токена
    validate(materialValidation.getMaterials),
    materialController.getMaterials
  );

router
  .route('/:materialId')
  .get(
    authMiddleware(), // Проверка токена
    validate(materialValidation.getMaterial),
    materialController.getMaterial
  )
  .patch(
    authMiddleware(), // Проверка токена
    validate(materialValidation.updateMaterial),
    materialController.updateMaterial
  )
  .delete(
    authMiddleware(), // Проверка токена
    validate(materialValidation.deleteMaterial),
    materialController.deleteMaterial
  );

module.exports = router;
