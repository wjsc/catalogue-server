const storage = require(__dirname + '/storage.js');
const collection = 'favorites';

const favoriteStorageDecorator={
	getFavorites: function(user, offset, limit){
		return storage.find(collection, {user}, offset, limit, {_id: -1});
	},
	getFavoritesById: function(user, tracks){
		return storage.find(collection, {user, track: {$in: tracks} } );
	},
	insertFavorite: function(favorite){
		return storage.insert(collection, favorite);
	},
	deleteFavorite: function(favorite){
		return storage.delete(collection, favorite);;
	}
}
module.exports=favoriteStorageDecorator;