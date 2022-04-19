const { createDataValidator, updateDataValidator, archivedValidator, idValidator } = require('../utils/validators');
const AppError = require('../utils/appError');

/**
 * Check new note data
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.checkCreateData = (req, res, next) => {
  const validated = createDataValidator.validate(req.body);

  if (validated.error) return next(new AppError(validated.error.details[0].message, 400));

  req.body = validated.value;

  next();
};

/**
 * Check note update data
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.checkUpdateData = (req, res, next) => {
  const validated = updateDataValidator.validate(req.body);

  if (validated.error) return next(new AppError(validated.error.details[0].message, 400));

  req.body = validated.value;

  next();
};

/**
 * Check note id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.checkId = (req, res, next) => {
  const validated = idValidator.validate(req.params);

  if (validated.error) return next(new AppError(validated.error.details[0].message, 400));

  req.params = validated.value;

  next();
};

/**
 * Check note archived
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */
exports.checkArchived = (req, res, next) => {
  const validated = archivedValidator.validate(req.body);

  if (validated.error) return next(new AppError(validated.error.details[0].message, 400));

  req.body = validated.value;

  next();
};
