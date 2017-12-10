const Joi = require('joi');

const trackSchema = Joi.object().keys({
	title: Joi.string().min(3).required(),
	duration: Joi.number().integer().min(1).required(),
	audio: Joi.string().required()
});

module.exports = trackSchema;
