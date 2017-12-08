const Track={
	init: function(id, path, title, duration){
		return this.setId(id)
					.setPath(path)
					.setTitle(title)
					.setDuration(duration);
	},
	setId: function(param){
		this.id=param;
		return this;
	},
	setPath: function(param){
		this.path=param;
		return this;
	},
	setTitle: function(param){
		this.title=param;
		return this;
	},
	setDuration: function(param){
		this.duration=param;
		return this;
	},
	getId: function(){
		return this.id;
	},
	getPath: function(){
		return this.path;
	},
	getTitle: function(){
		return this.title;
	},
	getDuration: function(){
		return this.duration;
	}
}
module.exports = Track;
