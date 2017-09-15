const artistStorageDecorator={
	init: function(storage){
		this.storage=storage;
		return this;
	},
	getArtists: function(){
		return this.storage.find({});
	},
	getArtist: function(id){
		return this.storage.findOne({_id:this.storage.Mongo.ObjectID(id)});
	},
	searchArtistsByName: function(keyword){
		return this.storage.find({ $text: { $search: keyword} });
	},
	insertArtist: function(artist){
		return this.storage.insert(artist);
	},
	updateArtist: function(artist){
		return this.insertArtist(artist);
	},
	deleteArtist: function(artist){
		return false;
	}
}
module.exports=artistStorageDecorator;