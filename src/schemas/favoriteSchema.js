const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');
const firebaseUserIdSchema = require( __dirname+'/firebaseUserIdSchema.js');

const favoriteSchema = Joi.object().keys({
	user: firebaseUserIdSchema,
	track: mongoIdSchema
});

module.exports = favoriteSchema;
