const Joi = require('joi');
const favoriteStorageDecorator = require(__dirname + '/../storage/favoriteStorageDecorator.js');
const favoriteSchema = require(__dirname + "/../schemas/favoriteSchema.js");

const favoriteService={
    get: function(user){
        return favoriteStorageDecorator.getFavorites(user)
    },
    getById: function(user, id){
        return favoriteStorageDecorator.getFavoritesById(user, id)
    },
    insert: function(favorite){
        const {error} = Joi.validate(favorite, favoriteSchema);
        return error === null ? favoriteStorageDecorator.insertFavorite(favorite): Promise.reject(error);
    },
    del: function(favorite){
        return favoriteStorageDecorator.deleteFavorite(favorite)
    },
}
module.exports = favoriteService;