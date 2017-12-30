const artistService = require(__dirname + '/../services/artistService.js');
const config = require('config');

const artistRoutes={
	init: function(server){
		server.get('/artist', this.handleGet);
		server.get('/artist/:id', this.handleGetById);
		server.get('/artist/search/:keyword', this.handleGetSearch);
		server.post('/artist', this.handlePost);
		server.put('/artist/:id', this.handlePut);
		server.del('/artist/:id', this.handleDel);
		return this;
	},
	handleGet: function(req, res, next){
		return buildResponse(req, res, next, artistService.get);
	},
	handleGetById: function(req, res, next){
		return buildResponse(req, res, next, () => artistService.getById(req.params.id.split(',')));
	},
	handleGetSearch: function(req, res, next){
		return buildResponse(req, res, next, () => artistService.search(req.params.keyword));
	},
	handlePost: function(req, res, next){
		return buildResponse(req, res, next, () => artistService.insert(req.body));
	},
	handlePut: function(req, res, next){
		return buildResponse(req, res, next, () => artistService.update(req.params.id, req.body));
	},
	handleDel: function(req, res, next){
		return buildResponse(req, res, next, () => artistService.del(req.params.id));
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
module.exports=artistRoutes;