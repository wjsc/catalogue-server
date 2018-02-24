const trackService = require(__dirname + '/../services/trackService.js');
const config = require('config');

const trackRoutes={
	init: function(server){
		server.get('/a/track', this.handleGet);
		server.get('/a/track/:id', this.handleGetById);
		server.get('/a/track/album/:id', this.handleGetByAlbum);
		server.get('/a/track/artist/:id', this.handleGetByArtist);
		server.get('/a/track/search/:keyword', this.handleGetSearch);
		server.post('/a/track', this.handlePost);
		server.put('/a/track/:id', this.handlePut);
		server.del('/a/track/:id', this.handleDel);
		return this;
	},
	handleGet: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.get(req.query.offset, req.query.limit));
	},
	handleGetById: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.getById(req.params.id.split(',')));
	},
	handleGetByAlbum: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.getByAlbum(req.params.id));
	},
	handleGetByArtist: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.getByArtist(req.params.id));
	},
	handleGetSearch: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.search(req.params.keyword));
	},
	handlePost: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.insert(req.body));
	},
	handlePut: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.update(req.params.id, req.body));
	},
	handleDel: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.del(req.params.id));
	},
}

const buildResponse = function (req, res, next, serviceMethod) {
	serviceMethod()
	.then((result)=>{
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',
							'Cache-Control':'public, max-age='+config.get("server.cacheMaxAge")});
		res.end(JSON.stringify(result));
		return next();
	})
	.catch((err)=>{
		res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
		res.end(JSON.stringify({ error: err.message}));
	})
	return next(false);
}
module.exports=trackRoutes;