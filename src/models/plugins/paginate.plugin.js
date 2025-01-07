/**
 * @typedef {Object} QueryResult
 * @property {Document[]} results - Результаты
 * @property {number} page - Текущая страница
 * @property {number} limit - Лимит на страницу
 * @property {number} totalPages - Общее количество страниц
 * @property {number} totalResults - Общее количество результатов
 */

/**
 * Плагин для пагинации
 * @param {Schema} schema
 */
function paginate(schema) {
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    // Обработка populate
    let populate = options.populate;
    if (Array.isArray(populate)) {
      populate = populate.join(' '); // Преобразуем массив в строку
    }

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (populate) {
      docsPromise = docsPromise.populate(populate); // Применяем populate, если он задан
    }

    docsPromise = docsPromise.exec();

    const [totalResults, results] = await Promise.all([countPromise, docsPromise]);
    const totalPages = Math.ceil(totalResults / limit);
    const result = {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
    return Promise.resolve(result);
  };
}

module.exports = paginate;
