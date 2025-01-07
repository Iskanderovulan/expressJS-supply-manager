// src/services/material.service.js
const Material = require('../models/material.model');

const createMaterial = async (materialBody) => {
  return Material.create(materialBody);
};

const queryMaterials = async (filter, options) => {
  const materials = await Material.paginate(filter, options);
  return materials;
};

const getAllMaterials = async (filter) => {
  return Material.find(filter).exec();
};

const getMaterialById = async (id) => {
  return Material.findById(id);
};

const updateMaterialById = async (materialId, updateBody) => {
  const material = await getMaterialById(materialId);
  if (!material) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Material not found');
  }
  Object.assign(material, updateBody);
  await material.save();
  return material;
};

const deleteMaterialById = async (materialId) => {
  const material = await getMaterialById(materialId);
  if (!material) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Material not found');
  }
  await material.remove();
  return material;
};

module.exports = {
  createMaterial,
  queryMaterials,
  getMaterialById,
  updateMaterialById,
  deleteMaterialById,
  getAllMaterials,
};
