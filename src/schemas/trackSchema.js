const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');

const trackSchema = Joi.object().keys({
	_id: mongoIdSchema,
	artist: mongoIdSchema,
	album: mongoIdSchema,
	title: Joi.string().min(3).required(),
	no: Joi.number().integer().min(1).required(),
	duration: Joi.number().min(1).required(),
	audio: Joi.string().required()
});

module.exports = trackSchema;
