const storage=require(__dirname + '/storage.js');
const collection = 'tracks';

const trackStorageDecorator={
	getTracks: function(){
		return storage.find(collection, {});
	},
	getTrack: function(id){
		return storage.findOne(collection, {_id:storage.ObjectID(id)});
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