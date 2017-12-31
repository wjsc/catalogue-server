const storage=require(__dirname + '/storage.js');
const collection = 'tracks';

const trackStorageDecorator={
	getTracks: function(){
		return storage.find(collection, {});
	},
	getTrack: function(ids){
		return ids.length > 1 	? storage.find(collection, {_id: {$in: ids} } ) 
								: storage.findOne(collection, {_id: ids[0] } );
	},
	getTracksByAlbum: function(album){
		return storage.find(collection, {"album._id" : album});
	},
	getTracksByArtist: function(artist){
		return storage.find(collection, {"artist._id": artist});
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