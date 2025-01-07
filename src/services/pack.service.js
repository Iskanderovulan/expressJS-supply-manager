const Pack = require('../models/pack.model');

const createPack = async (packBody) => {
  return Pack.create(packBody);
};

const queryPacks = async (filter, options) => {
  return Pack.paginate(filter, options);
};

const getAllPacks = async (filter) => {
  return Pack.find(filter).exec();
};

const getPackById = async (id) => {
  return Pack.findById(id);
};

const updatePackById = async (packId, updateBody) => {
  const pack = await getPackById(packId);
  if (!pack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pack not found');
  }
  Object.assign(pack, updateBody);
  await pack.save();
  return pack;
};

const deletePackById = async (packId) => {
  const pack = await getPackById(packId);
  if (!pack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pack not found');
  }
  await pack.remove();
  return pack;
};

module.exports = {
  createPack,
  queryPacks,
  getPackById,
  updatePackById,
  deletePackById,
  getAllPacks,
};
