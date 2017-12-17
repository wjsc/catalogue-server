const storage = require(__dirname + '/storage.js');
const collection = 'favorites';

const favoriteStorageDecorator={
	getFavorites: function(user){
		return storage.find(collection, {user});
	},
	getFavoritesById: function(user, tracks){
		return storage.find(collection, {user, track: {$in: tracks} } );
	},
	insertFavorite: function(favorite){
		return storage.insert(collection, favorite);
	},
	deleteFavorite: function(favorite){
		return false;
	}
}
module.exports=favoriteStorageDecorator;