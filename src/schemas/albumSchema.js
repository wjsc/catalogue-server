const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');

const albumSchema = Joi.object().keys({
	title: Joi.string().min(3).required(),
	year: Joi.number().integer().min(1900).max((new Date()).getFullYear()).required(),
	cover: Joi.string().required(),
	tracks: Joi.array().items(mongoIdSchema)
});

module.exports = albumSchema;
