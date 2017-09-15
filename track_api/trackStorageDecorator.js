const trackStorageDecorator={
	init: function(storage){
		this.storage=storage;
		return this;
	},
	getTracks: function(){
		return this.storage.find({});
	},
	getTrack: function(id){
		return this.storage.findOne({_id:this.storage.Mongo.ObjectID(id)});
	},
	searchTracksByTitle: function(keyword){
		return this.storage.find({ $text: { $search: keyword} });
	},
	insertTrack: function(track){
		return this.storage.insert(track);
	},
	updateTrack: function(track){
		return this.insertTrack(track);
	},
	deleteTrack: function(track){
		return false;
	}
}
module.exports=trackStorageDecorator;