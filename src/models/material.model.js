// src/models/material.model.js
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const materialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hardness: {
      type: Number,
      min: 1,
      max: 3,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
materialSchema.plugin(toJSON);
materialSchema.plugin(paginate);

/**
 * @typedef Material
 */
const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
