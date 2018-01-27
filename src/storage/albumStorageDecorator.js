const storage = require(__dirname + '/storage.js');
const collection = 'albums';

const albumStorageDecorator={
	getAlbums: function(offset, limit){
		return storage.find(collection, {}, offset, limit);
	},
	getAlbum: function(ids){
		return ids.length > 1 	? storage.find(collection, {_id: {$in: ids} } ) 
								: storage.findOne(collection, {_id: ids[0] } );
	},
	getAlbumsByArtist: function(artist){
		return storage.find(collection, {"artist._id": artist});
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