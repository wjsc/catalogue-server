const Joi = require('joi');

const firebaseUserIdSchema = Joi.string().min(28).max(28).required();

module.exports = firebaseUserIdSchema;
