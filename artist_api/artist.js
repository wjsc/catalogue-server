const Artist={
	init: function(id, name, albums){
		return this.setId(id)
					.setName(name)
					.setAlbums(albums);
	},
	setId: function(param){
		this.id=param;
		return this;
	},
	setName: function(param){
		this.name=param;
		return this;
	},
	setAlbums: function(param){
		this.albums=param;
		return this;
	},
	getId: function(){
		return this.id;
	},
	getName: function(){
		return this.name;
	},
	getAlbums: function(){
		return this.albums;
	},
	
}
module.exports=Artist;