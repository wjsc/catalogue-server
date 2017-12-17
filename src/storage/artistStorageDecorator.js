const storage = require(__dirname + '/storage.js');
const collection = 'artists';

const artistStorageDecorator={
	getArtists: function(){
		return storage.find(collection, {});
	},
	getArtist: function(id){
		return storage.findOne(collection, {_id: id});
	},
	searchArtistsByName: function(keyword){
		return storage.find(collection, { $text: { $search: keyword} });
	},
	insertArtist: function(artist){
		return storage.insert(collection, artist);
	},
	updateArtist: function(artist){
		return this.insertArtist(collection, artist);
	},
	deleteArtist: function(artist){
		return false;
	}
}
module.exports=artistStorageDecorator;