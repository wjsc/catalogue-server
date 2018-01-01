const favoriteService = require(__dirname + '/../services/favoriteService.js');
const config = require('config');

const favoriteRoutes={
	init: function(server){
        server.get('/favorite/user/:user', this.handleGet);
        server.get('/favorite', this.handleGetById);
		server.post('/favorite', this.handlePost);
		server.del('/favorite', this.handleDel);
		return this;
	},
	handleGet: function(req, res, next){
		return buildResponse(req, res, next, () => favoriteService.get(req.params.user));
    },
    handleGetById: function(req, res, next){
		return buildResponse(req, res, next, () => favoriteService.getById(req.query.user, req.query.tracks.split(',')));
	},
	handlePost: function(req, res, next){
		return buildResponse(req, res, next, () => favoriteService.insert(req.body));
	},
	handleDel: function(req, res, next){
		return buildResponse(req, res, next, () => favoriteService.del(req.body));
	},
}

const buildResponse = function (req, res, next, serviceMethod) {
	serviceMethod()
	.then((result)=>{
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',
							'Cache-Control':'private, max-age=0'});
		res.end(JSON.stringify(result));
		return next();
	})
	.catch((err)=>{
		res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
		res.end(JSON.stringify({ error: err.message}));
	})
	return next(false);
}
module.exports=favoriteRoutes;