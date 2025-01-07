const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createColor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    intensity: Joi.number().min(1).max(5),
  }),
};

const getColors = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    intensity: Joi.string(),
    createdBefore: Joi.date(),
    createdAfter: Joi.date(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    paginated: Joi.string().valid('0', '1'),

  }),
};

const getColor = {
  params: Joi.object().keys({
    colorId: Joi.string().custom(objectId),
  }),
};

const updateColor = {
  params: Joi.object().keys({
    colorId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      intensity: Joi.number().min(1).max(5),
    })
    .min(1),
};

const deleteColor = {
  params: Joi.object().keys({
    colorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createColor,
  getColors,
  getColor,
  updateColor,
  deleteColor,
};
