const Joi = require('joi');
const albumStorageDecorator = require(__dirname + '/../storage/albumStorageDecorator.js');
const albumSchema = require(__dirname + "/../schemas/albumSchema.js");

const albumService={
    get: function(){
        return albumStorageDecorator.getAlbums()
    },
    getById: function(id){
        return albumStorageDecorator.getAlbum(id)
    },
    search: function(keyword){
        return albumStorageDecorator.searchAlbumsByName(keyword)
    },
    insert: function(album){
        const {error} = Joi.validate(album, albumSchema);
        return error === null ? albumStorageDecorator.insertAlbum(album) : Promise.reject(error);
    },
    update: function(id, album){
        const {error} = Joi.validate(album, albumSchema);
        album.id = id;
        return error === null ? albumStorageDecorator.update(album): Promise.reject(error);
    },
    del: function(id){
        return albumStorageDecorator.deleteAlbum(id)
    },
}
module.exports = albumService;