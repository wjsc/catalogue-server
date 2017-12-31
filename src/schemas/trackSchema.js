const Joi = require('joi');
const mongoIdSchema = require( __dirname+'/mongoIdSchema.js');

const trackSchema = Joi.object().keys({
	_id: mongoIdSchema,
	artist: {
		_id: mongoIdSchema,
		name: Joi.string().min(3).required()
	},
	album: {
		_id: mongoIdSchema,
		title: Joi.string().min(2).required()
	},
	title: Joi.string().min(3).required(),
	no: Joi.number().integer().min(1).required(),
	duration: Joi.number().min(1).required(),
	audio: Joi.string().required()
});

module.exports = trackSchema;
