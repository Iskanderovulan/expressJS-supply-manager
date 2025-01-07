const Joi = require('joi');

const getStatistics = {
    query: Joi.object().keys({
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
    }),
};

module.exports = { getStatistics };
