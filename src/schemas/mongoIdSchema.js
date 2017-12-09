const Joi = require('joi');

const mongoIdSchema = Joi.string().alphanum().min(24).max(24).required();

module.exports = mongoIdSchema;
