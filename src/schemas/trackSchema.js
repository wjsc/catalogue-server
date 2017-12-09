const Joi = require('joi');

const trackSchema = Joi.object().keys({
	title: Joi.string().alphanum().min(3).required(),
	duration: Joi.number().integer().min(1).required(),
	audio: Joi.string().alphanum().required()
});

module.exports = trackSchema;
