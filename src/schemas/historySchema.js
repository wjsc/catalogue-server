const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');

const historySchema = Joi.object().keys({
	user: mongoIdSchema,
	track: mongoIdSchema,
	date: Joi.date().iso()
});

module.exports = historySchema;
