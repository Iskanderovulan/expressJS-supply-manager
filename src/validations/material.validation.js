// src/validations/material.validation.js
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMaterial = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    hardness: Joi.number().min(1).max(10),
  }),
};

const getMaterials = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    hardness: Joi.string().optional(), // Разрешаем параметр hardness
    createdBefore: Joi.date().optional(),
    createdAfter: Joi.date().optional(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    paginated: Joi.string().valid('0', '1'),
  }),
};

const getMaterial = {
  params: Joi.object().keys({
    materialId: Joi.string().custom(objectId),
  }),
};

const updateMaterial = {
  params: Joi.object().keys({
    materialId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      hardness: Joi.number().min(1).max(10),
    })
    .min(1),
};

const deleteMaterial = {
  params: Joi.object().keys({
    materialId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
