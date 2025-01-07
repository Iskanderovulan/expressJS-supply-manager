const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const materialRoute = require('./material.route');
const colorRoute = require('./color.route');
const packRoute = require('./pack.route');
const productRoute = require('./product.route');
const statsRoute = require('./stats.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/materials',
    route: materialRoute,
  },
  {
    path: '/colors',
    route: colorRoute,
  },

  {
    path: '/packs',
    route: packRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/statistics',
    route: statsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
