let Album;
let albumStorageDecorator;
let apiKey;
const defaultHeader={'Content-Type': 'application/json; charset=utf-8'};

const albumRoutes={
	init: function(endpoint, server, apiKeyExt, albumStorageDecoratorExt, AlbumExt, requestAlbumValidator){
		albumStorageDecorator=albumStorageDecoratorExt;
		Album=AlbumExt;
		apiKey=apiKeyExt;

		server.use(this.authenticate);
		server.get('/'+endpoint, requestAlbumValidator.validateGet, this.handleGet);
		server.get('/'+endpoint+'/:id', requestAlbumValidator.validateGetById, this.handleGetById);
		server.get('/'+endpoint+'/search/:keyword', requestAlbumValidator.validateGetSearch, this.handleGetSearch);
		server.post('/'+endpoint, requestAlbumValidator.validatePost, this.handlePost);
		server.put('/'+endpoint+'/:id', requestAlbumValidator.validatePut, this.handlePut);
		server.del('/'+endpoint+'/:id', requestAlbumValidator.validateDel, this.handleDel);

		return this;
	},
	authenticate: function(req, res, next){
		if(!apiKey){
			return next();
		}
		res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
		res.send(401);                                                            
	    return next(false); 
	},
	handleGet: function(req, res, next){
		albumStorageDecorator.getAlbums()
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
		albumStorageDecorator.getAlbum(req.params.id)
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
		albumStorageDecorator.searchAlbumsByTitle(req.params.keyword)
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
		let album = Object.create(Album).setTitle(req.body.title)
										.setYear(req.body.year)
										.setCoverPath(req.body.coverPath)
										.setTracks(req.body.tracks);

		albumStorageDecorator.insertAlbum(album)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(album));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
	handlePut: function(req, res, next){
		let album = Object.create(Album).setId(req.params.id)
										.setTitle(req.body.title)
										.setYear(req.body.year)
										.setCoverPath(req.body.coverPath)
										.setTracks(req.body.tracks);

		albumStorageDecorator.updateAlbum(album)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(album));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
	handleDel: function(req, res, next){
		let album = Object.create(Album).setId(req.params.id);

		albumStorageDecorator.deleteAlbum(album)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(album));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
}
module.exports=albumRoutes;