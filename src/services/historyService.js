const Joi = require('joi');
const historyStorageDecorator = require(__dirname + '/../storage/historyStorageDecorator.js');
const historySchema = require(__dirname + "/../schemas/historySchema.js");

const historyService={
    get: function(user){
        return historyStorageDecorator.getHistory(user)
    },
    insert: function(history){
        const {error} = Joi.validate(history, historySchema);
        return error === null ? historyStorageDecorator.insertHistory(history) : Promise.reject(error);
    },
}
module.exports = historyService;