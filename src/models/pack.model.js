const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const packSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
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

packSchema.plugin(toJSON);
packSchema.plugin(paginate);

/**
 * @typedef Pack
 */
const Pack = mongoose.model('Pack', packSchema);

module.exports = Pack;
