const Joi = require('joi');
const artistStorageDecorator = require(__dirname + '/../storage/artistStorageDecorator.js');
const artistSchema = require(__dirname + "/../schemas/artistSchema.js");

const artistService={
    get: function(){
        return artistStorageDecorator.getArtists()
    },
    getById: function(id){
        return artistStorageDecorator.getArtist(id)
    },
    search: function(keyword){
        return artistStorageDecorator.searchArtistsByName(keyword)
    },
    insert: function(artist){
        const {error} = Joi.validate(artist, artistSchema);
        return error === null ? artistStorageDecorator.insertArtist(artist): Promise.reject(error);
    },
    update: function(id, artist){
        const {error} = Joi.validate(artist, artistSchema);
        artist.id = id;
        return error === null ? artistStorageDecorator.update(artist): Promise.reject(error);
    },
    del: function(id){
        return artistStorageDecorator.deleteArtist(id)
    },
}
module.exports = artistService;