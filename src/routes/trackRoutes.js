const trackStorageDecorator = require(__dirname + '/../storage/trackStorageDecorator.js');
const track = require(__dirname + "/../models/track.js");
const defaultHeader={'Content-Type': 'application/json; charset=utf-8'};

const trackRoutes={
	init: function(server, apiKeyExt){
		server.use(this.authenticate);
		server.get('/track', this.handleGet);
		server.get('/track/:id', this.handleGetById);
		server.get('/track/search/:keyword', this.handleGetSearch);
		server.post('/track', this.handlePost);
		server.put('/track/:id', this.handlePut);
		server.del('/track/:id', this.handleDel);

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
		trackStorageDecorator.getTracks()
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
		trackStorageDecorator.getTrack(req.params.id)
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
		trackStorageDecorator.searchTracksByTitle(req.params.keyword)
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
		let track = Object.create(Track).setPath(req.body.path)
										.setTitle(req.body.title)
										.setDuration(req.body.duration);

		trackStorageDecorator.insertTrack(track)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(track));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
	handlePut: function(req, res, next){
		let track = Object.create(Track).setId(req.params.id)
										.setPath(req.body.path)
										.setTitle(req.body.title)
										.setDuration(req.body.duration);

		trackStorageDecorator.updateTrack(track)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(track));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
	handleDel: function(req, res, next){
		let track = Object.create(Track).setId(req.params.id);

		trackStorageDecorator.deleteTrack(track)
		.then((result)=>{
				res.writeHead(200, defaultHeader);
				res.end(JSON.stringify(track));
				return next();
		})
		.catch((err)=>{
			res.writeHead(500, defaultHeader);
			res.end(err.message);
		})

		return next(false);
	},
}
module.exports=trackRoutes;