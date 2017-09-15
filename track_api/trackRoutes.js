let Track;
let trackStorageDecorator;
let apiKey;
const defaultHeader={'Content-Type': 'application/json; charset=utf-8'};

const trackRoutes={
	init: function(endpoint, server, apiKeyExt, trackStorageDecoratorExt, TrackExt, requestTrackValidator){
		trackStorageDecorator=trackStorageDecoratorExt;
		Track=TrackExt;
		apiKey=apiKeyExt;

		server.use(this.authenticate);
		server.get('/'+endpoint, requestTrackValidator.validateGet, this.handleGet);
		server.get('/'+endpoint+'/:id', requestTrackValidator.validateGetById, this.handleGetById);
		server.get('/'+endpoint+'/search/:keyword', requestTrackValidator.validateGetSearch, this.handleGetSearch);
		server.post('/'+endpoint, requestTrackValidator.validatePost, this.handlePost);
		server.put('/'+endpoint+'/:id', requestTrackValidator.validatePut, this.handlePut);
		server.del('/'+endpoint+'/:id', requestTrackValidator.validateDel, this.handleDel);

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