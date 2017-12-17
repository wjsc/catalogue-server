const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');

const favoriteSchema = Joi.object().keys({
	user: mongoIdSchema,
	track: mongoIdSchema
});

module.exports = favoriteSchema;
