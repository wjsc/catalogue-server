const storage = require(__dirname + '/storage.js');
const collection = 'favorites';

const favoriteStorageDecorator={
	getFavorites: function(user){
		return storage.find(collection, {user});
	},
	getFavoritesById: function(user, id){
		return storage.findOne(collection, {_id: id, user});
	},
	insertFavorite: function(favorite){
		return storage.insert(collection, favorite);
	},
	deleteFavorite: function(favorite){
		return false;
	}
}
module.exports=favoriteStorageDecorator;