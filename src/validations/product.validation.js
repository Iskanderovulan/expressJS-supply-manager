const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    material: Joi.string().custom(objectId).required(),
    color: Joi.string().custom(objectId).required(),
    pack: Joi.string().custom(objectId).required(),
  }),
};

const getProducts = {
    query: Joi.object().keys({
        page: Joi.number().integer().min(1),
        limit: Joi.number().integer().min(1),
        sortBy: Joi.string(),
        name: Joi.string(),
        materialIds: Joi.string().custom((value, helpers) => {
            const ids = value.split(',');
            for (const id of ids) {
                if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                    return helpers.error('any.invalid');
                }
            }
            return value;
        }),
        colorIds: Joi.string().custom((value, helpers) => {
            const ids = value.split(',');
            for (const id of ids) {
                if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                    return helpers.error('any.invalid');
                }
            }
            return value;
        }),
        packIds: Joi.string().custom((value, helpers) => {
            const ids = value.split(',');
            for (const id of ids) {
                if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                    return helpers.error('any.invalid');
                }
            }
            return value;
        }),
        createdBefore: Joi.date().iso(),
        createdAfter: Joi.date().iso(),
        priceMin: Joi.number().min(0),
        priceMax: Joi.number().min(0),
        paginated: Joi.string().valid('0', '1'),
    }),
};


const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number().min(0),
      material: Joi.string().custom(objectId),
      color: Joi.string().custom(objectId),
      pack: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
