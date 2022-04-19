const Joi = require('joi');

const enums = require('../constants/enums.js');
const regex = require('../constants/regex');

exports.createDataValidator = Joi.object({
  name: Joi.string().alphanum().min(1).max(20).trim().required(),
  category: Joi.string()
    .valid(...Object.keys(enums.categories))
    .required(),
  content: Joi.string().max(300)
});

exports.updateDataValidator = Joi.object({
  name: Joi.string().alphanum().min(1).max(20).trim(),
  category: Joi.string().valid(...Object.keys(enums.categories)),
  content: Joi.string().max(300),
  archived: Joi.boolean()
});

exports.idValidator = Joi.object({
  id: Joi.string().regex(regex.HEX).required()
});

exports.archivedValidator = Joi.object({
  archived: Joi.boolean().default(true)
});
