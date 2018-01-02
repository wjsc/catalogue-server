const fs = require('fs');
const restify = require('restify');
const corsMiddleware = require("restify-cors-middleware")
const config = require('config');

const package = JSON.parse(fs.readFileSync(__dirname + '/../package.json','utf8'));

const artistRoutes = require(__dirname + "/routes/artistRoutes.js");
const albumRoutes = require(__dirname + "/routes/albumRoutes.js");
const trackRoutes = require(__dirname + "/routes/trackRoutes.js");
const favoriteRoutes = require(__dirname + "/routes/favoriteRoutes.js");
const historyRoutes = require(__dirname + "/routes/historyRoutes.js");

const App={
	init: function(){
		const server = restify.createServer({
			name: package.name,
			version: package.version
		});

		server.use(restify.plugins.acceptParser(server.acceptable));
		server.use(restify.plugins.queryParser());
		server.use(restify.plugins.bodyParser());

		const cors = corsMiddleware({
			preflightMaxAge: 5,  
			origins: [config.get("server.origin")],
			allowHeaders: ["Access-Control-Allow-Origin", "Authorization"]
		   })
		
		server.pre(cors.preflight);
		server.use(cors.actual);
		artistRoutes.init(server);
		albumRoutes.init(server);
		trackRoutes.init(server);
		favoriteRoutes.init(server);
		historyRoutes.init(server);
		
		server.listen(config.get("server.port"), ()=>{
		 	console.log(server.name, server.url, package.description);
		});
		return this;
	}
}
module.exports=App;