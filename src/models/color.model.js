const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const colorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    intensity: {
      type: Number,
      min: 1,
      max: 5,
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

colorSchema.plugin(toJSON);
colorSchema.plugin(paginate);

/**
 * @typedef Color
 */
const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
