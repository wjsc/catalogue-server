const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');
const firebaseUserIdSchema = require( __dirname+'/firebaseUserIdSchema.js');

const historySchema = Joi.object().keys({
	user: firebaseUserIdSchema,
	track: mongoIdSchema,
	date: Joi.date().iso()
});

module.exports = historySchema;
