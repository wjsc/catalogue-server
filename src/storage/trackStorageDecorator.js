const storage=require(__dirname + '/storage.js');
const collection = 'tracks';

const trackStorageDecorator={
	getTracks: function(){
		return storage.find(collection, {});
	},
	getTrack: function(id){
		return storage.findOne(collection, {_id: id});
	},
	getTracksByAlbum: function(album){
		return storage.find(collection, {album: album});
	},
	getTracksByArtist: function(artist){
		return storage.find(collection, {artist});
	},
	searchTracksByTitle: function(keyword){
		return storage.find(collection, { $text: { $search: keyword} });
	},
	insertTrack: function(track){
		return storage.insert(collection, track);
	},
	updateTrack: function(track){
		return this.insertTrack(collection, track);
	},
	deleteTrack: function(track){
		return false;
	}
}
module.exports=trackStorageDecorator;