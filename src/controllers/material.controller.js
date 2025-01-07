const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { materialService } = require('../services');

// Создание материала с привязкой к пользователю
const createMaterial = catchAsync(async (req, res) => {
  console.log(req.query);
  const material = await materialService.createMaterial({
    ...req.body,
    user: req.user.id, // Привязываем материал к текущему пользователю
  });
  res.status(httpStatus.CREATED).send(material);
});

// Получение материалов, привязанных к пользователю
const getMaterials = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['name', 'hardness', 'createdBefore', 'createdAfter']);
  filter.user = req.user.id;

  const paginated = req.query.paginated !== '0';

  if (!paginated) {
    const materials = await materialService.getAllMaterials(filter);
    return res.send({ results: materials });
  }

  // Фильтр по имени (поиск без учета регистра)
  if (filter.name) {
    filter.name = { $regex: filter.name, $options: 'i' };
  }

  // Фильтр по множественному выбору материалов (твердость материалов)
  if (filter.hardness) {
    filter.hardness = { $in: filter.hardness.split(',') }; // Разделение значений через запятую
  }

  // Фильтр по диапазону дат создания (используется поле createdAt)
  if (filter.createdBefore || filter.createdAfter) {
    filter.createdAt = {};
    if (filter.createdBefore) {
      filter.createdAt.$lte = new Date(filter.createdBefore); // Фильтрация по дате создания до указанной даты
    }
    if (filter.createdAfter) {
      filter.createdAt.$gte = new Date(filter.createdAfter); // Фильтрация по дате создания после указанной даты
    }
    // Удаление полей createdBefore и createdAfter, чтобы они не попадали в фильтр
    delete filter.createdBefore;
    delete filter.createdAfter;
  }

  console.log(filter);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await materialService.queryMaterials(filter, options);
  res.send(result);
});

// Получение одного материала (проверка прав)
const getMaterial = catchAsync(async (req, res) => {
  const filter = { ...pick(req.query, ['name', 'hardness']), user: req.user.id }; // Добавляем фильтр по пользователю
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await materialService.queryMaterials(filter, options);
  res.send(result);
});

// Обновление материала (проверка прав)
const updateMaterial = catchAsync(async (req, res) => {
  const material = await materialService.getMaterialById(req.params.materialId);
  if (!material || material.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this material');
  }
  const updatedMaterial = await materialService.updateMaterialById(req.params.materialId, req.body);
  res.send(updatedMaterial);
});

// Удаление материала (проверка прав)
const deleteMaterial = catchAsync(async (req, res) => {
  const material = await materialService.getMaterialById(req.params.materialId);
  if (!material || material.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this material');
  }
  await materialService.deleteMaterialById(req.params.materialId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
