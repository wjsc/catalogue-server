const storage = require(__dirname + '/storage.js');
const collection = 'albums';

const albumStorageDecorator={
	getAlbums: function(){
		return storage.find(collection, {});
	},
	getAlbum: function(id){
		return storage.findOne(collection, {_id:storage.ObjectID(id)});
	},
	searchAlbumsByTitle: function(keyword){
		return storage.find(collection, { $text: { $search: keyword} });
	},
	insertAlbum: function(album){
		return storage.insert(collection, album);
	},
	updateAlbum: function(album){
		return this.insertAlbum(collection, album);
	},
	deleteAlbum: function(album){
		return false;
	}
}
module.exports=albumStorageDecorator;