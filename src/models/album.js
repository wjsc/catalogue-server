const Album={
	init: function(id, title, year, coverPath, tracks){
		return this.setId(id)
					.setTitle(title)
					.setYear(year)
					.setCoverPath(coverPath)
					.setTracks(tracks);
	},
	setId: function(param){
		this.id=param;
		return this;
	},
	setTitle: function(param){
		this.title=param;
		return this;
	},
	setYear: function(param){
		this.year=param;
		return this;
	},
	setCoverPath: function(param){
		this.coverPath=param;
		return this;
	},
	setTracks: function(param){
		this.tracks=param;
		return this;
	},
	getId: function(){
		return this.id;
	},
	getTitle: function(){
		return this.title;
	},
	getYear: function(){
		return this.year;
	},
	getCoverPath: function(){
		return this.coverPath;
	},
	getTracks: function(){
		return this.tracks;
	},
}
module.exports=Album;