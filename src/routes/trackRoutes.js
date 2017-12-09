const trackService = require(__dirname + '/../services/trackService.js');

const trackRoutes={
	init: function(server){
		server.get('/track', this.handleGet);
		server.get('/track/:id', this.handleGetById);
		server.get('/track/search/:keyword', this.handleGetSearch);
		server.post('/track', this.handlePost);
		server.put('/track/:id', this.handlePut);
		server.del('/track/:id', this.handleDel);
		return this;
	},
	handleGet: function(req, res, next){
		return buildResponse(req, res, next, trackService.get);
	},
	handleGetById: function(req, res, next){
		return buildResponse(req, res, next, () => trackService.getById(req.params.id));
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
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
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