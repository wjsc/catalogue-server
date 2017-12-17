const Joi = require('joi');

const mongoIdSchema = Joi.string().min(36).max(36).required();

module.exports = mongoIdSchema;
