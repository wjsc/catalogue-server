const albumStorageDecorator={
	init: function(storage){
		this.storage=storage;
		return this;
	},
	getAlbums: function(){
		return this.storage.find({});
	},
	getAlbum: function(id){
		return this.storage.findOne({_id:this.storage.Mongo.ObjectID(id)});
	},
	searchAlbumsByTitle: function(keyword){
		return this.storage.find({ $text: { $search: keyword} });
	},
	insertAlbum: function(album){
		return this.storage.insert(album);
	},
	updateAlbum: function(album){
		return this.insertAlbum(album);
	},
	deleteAlbum: function(album){
		return false;
	}
}
module.exports=albumStorageDecorator;