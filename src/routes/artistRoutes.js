const artistStorageDecorator = require(__dirname + '/../storage/artistStorageDecorator.js');
const artist = require(__dirname + "/../models/artist.js");
const defaultHeader={'Content-Type': 'application/json; charset=utf-8'};

const artistRoutes={
	init: function(server, apiKeyExt){
		server.use(this.authenticate);
		server.get('/artist', this.handleGet);
		server.get('/artist/:id', this.handleGetById);
		server.get('/artist/search/:keyword', this.handleGetSearch);
		server.post('/artist', this.handlePost);
		server.put('/artist/:id', this.handlePut);
		server.del('/artist/:id', this.handleDel);

		return this;
	},
	authenticate: function(req, res, next){
		if(true || !apiKey){
			return next();
		}
		res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
		res.send(401);                                                            
	    return next(false); 
	},
	handleGet: function(req, res, next){
		artistStorageDecorator.getArtists()
		.then((result)=>{
			res.writeHead(200, defaultHeader);
			res.end(JSON.stringify(result));
			return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})
		return next(false);
	},
	handleGetById: function(req, res, next){
		artistStorageDecorator.getArtist(req.params.id)
		.then((result)=>{
			res.writeHead(200, defaultHeader);
			res.end(JSON.stringify(result));
			return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})
	  	return next(false);
	},
	handleGetSearch: function(req, res, next){
		artistStorageDecorator.searchArtistsByName(req.params.keyword)
		.then((result)=>{
			res.writeHead(200, defaultHeader);
			res.end(JSON.stringify(result));
			return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})
		return next(false);
	},
	handlePost: function(req, res, next){
		let artist = Object.create(Artist).setName(req.body.name)
											.setAlbums(req.body.albums);

		artistStorageDecorator.insertArtist(artist)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(artist));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
	handlePut: function(req, res, next){
		let artist = Object.create(Artist).setId(req.params.id)
											.setName(req.body.name)
											.setAlbums(req.body.albums);

		artistStorageDecorator.updateArtist(artist)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(artist));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
	handleDel: function(req, res, next){
		let artist = Object.create(Artist).setId(req.params.id);

		artistStorageDecorator.deleteArtist(artist)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(artist));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
}
module.exports=artistRoutes;