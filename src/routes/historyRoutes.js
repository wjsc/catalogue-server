const historyService = require(__dirname + '/../services/historyService.js');
const config = require('config');

const historyRoutes={
	init: function(server){
		server.get('/history/user/:user', this.handleGet);
		server.post('/history', this.handlePost);
		return this;
	},
	handleGet: function(req, res, next){
		return buildResponse(req, res, next, () => historyService.get(req.params.user, parseInt(req.query.offset), parseInt(req.query.limit)));
	},
	handlePost: function(req, res, next){
		return buildResponse(req, res, next, () => historyService.insert(req.body));
	},
}

const buildResponse = function (req, res, next, serviceMethod) {
	serviceMethod()
	.then((result)=>{
		res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8',
							'Cache-Control':'public, max-age=0'});
		res.end(JSON.stringify(result));
		return next();
	})
	.catch((err)=>{
		res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
		res.end(JSON.stringify({ error: err.message}));
	})
	return next(false);
}
module.exports=historyRoutes;