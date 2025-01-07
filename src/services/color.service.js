const Color = require('../models/color.model');

const createColor = async (colorBody) => {
  return Color.create(colorBody);
};

const queryColors = async (filter, options) => {
  return Color.paginate(filter, options);
};

const getAllColors = async (filter) => {
  return Color.find(filter).exec();
};

const getColorById = async (id) => {
  return Color.findById(id);
};

const updateColorById = async (colorId, updateBody) => {
  const color = await getColorById(colorId);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  Object.assign(color, updateBody);
  await color.save();
  return color;
};

const deleteColorById = async (colorId) => {
  const color = await getColorById(colorId);
  if (!color) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');
  }
  await color.remove();
  return color;
};

module.exports = {
  createColor,
  queryColors,
  getColorById,
  updateColorById,
  deleteColorById,
  getAllColors,
};
