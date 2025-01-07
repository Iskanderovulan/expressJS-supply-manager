const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPack = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.number().min(1).max(5).required(),
  }),
};

const getPacks = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string().optional(), // Разрешаем параметр hardness
    createdBefore: Joi.date().optional(),
    createdAfter: Joi.date().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    paginated: Joi.string().valid('0', '1'),
  }),
};

const getPack = {
  params: Joi.object().keys({
    packId: Joi.string().custom(objectId),
  }),
};

const updatePack = {
  params: Joi.object().keys({
    packId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      type: Joi.number().min(1).max(5),
    })
    .min(1),
};

const deletePack = {
  params: Joi.object().keys({
    packId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPack,
  getPacks,
  getPack,
  updatePack,
  deletePack,
};
