const albumService = require(__dirname + '/../services/albumService.js');

const albumRoutes={
	init: function(server){
		server.get('/album', this.handleGet);
		server.get('/album/:id', this.handleGetById);
		server.get('/album/artist/:id', this.handleGetByArtist);
		server.get('/album/search/:keyword', this.handleGetSearch);
		server.post('/album', this.handlePost);
		server.put('/album/:id', this.handlePut);
		server.del('/album/:id', this.handleDel);
		return this;
	},
	handleGet: function(req, res, next){
		return buildResponse(req, res, next, albumService.get);
	},
	handleGetById: function(req, res, next){
		return buildResponse(req, res, next, () => albumService.getById(req.params.id));
	},
	handleGetByArtist: function(req, res, next){
		return buildResponse(req, res, next, () => albumService.getByArtist(req.params.id));
	},
	handleGetSearch: function(req, res, next){
		return buildResponse(req, res, next, () => albumService.search(req.params.keyword));
	},
	handlePost: function(req, res, next){
		return buildResponse(req, res, next, () => albumService.insert(req.body));
	},
	handlePut: function(req, res, next){
		return buildResponse(req, res, next, () => albumService.update(req.params.id, req.body));
	},
	handleDel: function(req, res, next){
		return buildResponse(req, res, next, () => albumService.del(req.params.id));
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
module.exports=albumRoutes;