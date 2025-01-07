const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { getStatisticsService } = require('../services'); // Предполагаем, что существует сервис

// Получение статистики
const fetchStatistics = catchAsync(async (req, res) => {
  // Проверка авторизации пользователя
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Получаем статистику через сервис
  const statistics = await getStatisticsService.getStatistics(req.user.id);

  // Отправляем данные клиенту
  res.status(httpStatus.OK).send(statistics);
});

module.exports = {
  fetchStatistics,
};
