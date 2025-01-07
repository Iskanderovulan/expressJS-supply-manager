const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

// Создание продукта
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct({
    ...req.body,
    user: req.user.id,
  });
  res.status(httpStatus.CREATED).send(product);
});

// Получение всех продуктов
const getProducts = catchAsync(async (req, res) => {
    let filter = pick(req.query, [
        'name',
        'materialIds', // Используем множественное число, чтобы было понятно, что это массив
        'colorIds',
        'packIds',
        'createdBefore',
        'createdAfter',
        'priceMin',
        'priceMax',
    ]);
    filter.user = req.user.id;

    const paginated = req.query.paginated !== '0';

    if (!paginated) {
        const products = await productService.getAllProducts(filter);
        return res.send(products);
    }

    // Фильтр по имени (поиск без учета регистра)
    if (filter.name) {
        filter.name = { $regex: filter.name, $options: 'i' };
    }

    // Фильтр по материалам (множественный выбор)
    if (filter.materialIds) {
        filter.material = { $in: filter.materialIds.split(',') };
        delete filter.materialIds;
    }

    // Фильтр по цветам (множественный выбор)
    if (filter.colorIds) {
        filter.color = { $in: filter.colorIds.split(',') };
        delete filter.colorIds;
    }

    // Фильтр по упаковкам (множественный выбор)
    if (filter.packIds) {
        filter.pack = { $in: filter.packIds.split(',') };
        delete filter.packIds;
    }

    // Фильтр по диапазону дат создания
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

    // Фильтр по диапазону цен
    if (filter.priceMin || filter.priceMax) {
        filter.price = {};
        if (filter.priceMin) {
            filter.price.$gte = Number(filter.priceMin);
        }
        if (filter.priceMax) {
            filter.price.$lte = Number(filter.priceMax);
        }
        delete filter.priceMin;
        delete filter.priceMax;
    }

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await productService.queryProducts(filter, options);
    res.send(result);
});

// Получение одного продукта
const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product || product.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to access this product');
  }
  res.send(product);
});

// Обновление продукта
const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product || product.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this product');
  }
  const updatedProduct = await productService.updateProductById(req.params.productId, req.body);
  res.send(updatedProduct);
});

// Удаление продукта
const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product || product.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this product');
  }
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
