const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { colorService } = require('../services');

// Создание цвета
const createColor = catchAsync(async (req, res) => {
  const color = await colorService.createColor({
    ...req.body,
    user: req.user.id,
  });
  res.status(httpStatus.CREATED).send(color);
});

// Получение всех цветов
const getColors = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['name', 'intensity', 'createdBefore', 'createdAfter']);
  filter.user = req.user.id;

  const paginated = req.query.paginated !== '0';
  if (!paginated) {
    // Возвращаем полный список
    const colors = await colorService.getAllColors(filter);
    return res.send({ results: colors });
  }

  if (filter.name) {
    filter.name = { $regex: filter.name, $options: 'i' };
  }

  if (filter.intensity) {
    filter.intensity = { $in: filter.intensity.split(',') };
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
  const result = await colorService.queryColors(filter, options);
  res.send(result);
});

// Получение одного цвета
const getColor = catchAsync(async (req, res) => {
  const color = await colorService.getColorById(req.params.colorId);
  if (!color || color.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to access this color');
  }
  res.send(color);
});

// Обновление цвета
const updateColor = catchAsync(async (req, res) => {
  const color = await colorService.getColorById(req.params.colorId);
  if (!color || color.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this color');
  }
  const updatedColor = await colorService.updateColorById(req.params.colorId, req.body);
  res.send(updatedColor);
});

// Удаление цвета
const deleteColor = catchAsync(async (req, res) => {
  const color = await colorService.getColorById(req.params.colorId);
  if (!color || color.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this color');
  }
  await colorService.deleteColorById(req.params.colorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createColor,
  getColors,
  getColor,
  updateColor,
  deleteColor,
};
