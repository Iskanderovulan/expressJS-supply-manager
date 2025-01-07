const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packService } = require('../services');

// Создание пакета
const createPack = catchAsync(async (req, res) => {
  const pack = await packService.createPack({
    ...req.body,
    user: req.user.id, // Привязываем пакет к текущему пользователю
  });
  res.status(httpStatus.CREATED).send(pack);
});

// Получение пакетов
const getPacks = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['name', 'type', 'createdBefore', 'createdAfter']);
  filter.user = req.user.id;

  const paginated = req.query.paginated !== '0';

  if (!paginated) {
    const packs = await packService.getAllPacks(filter);
    return res.send({ results: packs });
  }

  if (filter.name) {
    filter.name = { $regex: filter.name, $options: 'i' };
  }

  if (filter.type) {
    filter.type = { $in: filter.type.split(',') };
  }

  if (filter.createdBefore || filter.createdAfter) {
    filter.createdAt = {};
    if (filter.createdBefore) {
      filter.createdAt.$lte = new Date(filter.createdBefore);
    }
    if (filter.createdAfter) {
      filter.createdAt.$gte = new Date(filter.createdAfter);
    }
    delete filter.createdBefore;
    delete filter.createdAfter;
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await packService.queryPacks(filter, options);
  res.send(result);
});

// Получение одного пакета (проверка прав)
const getPack = catchAsync(async (req, res) => {
  const pack = await packService.getPackById(req.params.packId);
  if (!pack || pack.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to access this pack');
  }
  res.send(pack);
});

// Обновление пакета (проверка прав)
const updatePack = catchAsync(async (req, res) => {
  const pack = await packService.getPackById(req.params.packId);
  if (!pack || pack.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this pack');
  }
  const updatedPack = await packService.updatePackById(req.params.packId, req.body);
  res.send(updatedPack);
});

// Удаление пакета (проверка прав)
const deletePack = catchAsync(async (req, res) => {
  const pack = await packService.getPackById(req.params.packId);
  if (!pack || pack.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this pack');
  }
  await packService.deletePackById(req.params.packId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPack,
  getPacks,
  getPack,
  updatePack,
  deletePack,
};
