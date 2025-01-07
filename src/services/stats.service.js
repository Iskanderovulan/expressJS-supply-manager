const Material = require('../models/material.model');
const Color = require('../models/color.model');
const Pack = require('../models/pack.model');
const Product = require('../models/product.model');

const getStatistics = async (userId) => {
  const [colorsCount, materialsCount, packsCount, productsCount] = await Promise.all([
    Color.countDocuments({ user: userId }),
    Material.countDocuments({ user: userId }),
    Pack.countDocuments({ user: userId }),
    Product.countDocuments({ user: userId }),
  ]);

  const total = colorsCount + materialsCount + packsCount;

  return {
    stats: {
      colors: colorsCount,
      materials: materialsCount,
      packs: packsCount,
      total,
    },
    categories: [
      { category: 'Colors', count: colorsCount },
      { category: 'Materials', count: materialsCount },
      { category: 'Packs', count: packsCount },
    ],
  };
};

module.exports = { getStatistics };
