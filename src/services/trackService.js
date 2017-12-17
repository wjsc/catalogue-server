const Joi = require('joi');
const trackStorageDecorator = require(__dirname + '/../storage/trackStorageDecorator.js');
const trackSchema = require(__dirname + "/../schemas/trackSchema.js");

const trackService={
    get: function(){
        return trackStorageDecorator.getTracks()
    },
    getById: function(id){
        return trackStorageDecorator.getTrack(id)
    },
    getByAlbum: function(album){
        return trackStorageDecorator.getTracksByAlbum(album)
    },
    getByArtist: function(artist){
        return trackStorageDecorator.getTracksByArtist(artist)
    },
    search: function(keyword){
        return trackStorageDecorator.searchTracksByName(keyword)
    },
    insert: function(track){
        const {error} = Joi.validate(track, trackSchema);
        return error === null ? trackStorageDecorator.insertTrack(track): Promise.reject(error);
    },
    update: function(id, track){
        const {error} = Joi.validate(track, trackSchema);
        track.id = id;        
        return error === null ? trackStorageDecorator.update(track): Promise.reject(error);
    },
    del: function(id){
        return trackStorageDecorator.deleteTrack(id)
    },
}
module.exports = trackService;