const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');

const historySchema = Joi.object().keys({
	user: mongoIdSchema,
	track: mongoIdSchema
});

module.exports = historySchema;
