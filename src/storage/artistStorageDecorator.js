const storage = require(__dirname + '/storage.js');
const collection = 'artists';

const artistStorageDecorator={
	getArtists: function(){
		return storage.find(collection, {});
	},
	getArtist: function(ids){
		return ids.length > 1 	? storage.find(collection, {_id: {$in: ids} } ) 
								: storage.findOne(collection, {_id: ids[0] } );
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