const fs = require('fs');
const restify = require('restify');
const config = require('config');

const package = JSON.parse(fs.readFileSync(__dirname + '/../package.json','utf8'));

const artistRoutes = require(__dirname + "/routes/artistRoutes.js");
const albumRoutes = require(__dirname + "/routes/albumRoutes.js");
const trackRoutes = require(__dirname + "/routes/trackRoutes.js");

const App={
	init: function(){
		const server = restify.createServer({
			name: package.name,
			version: package.version
		});

		server.use(restify.plugins.acceptParser(server.acceptable));
		server.use(restify.plugins.queryParser());
		server.use(restify.plugins.bodyParser());

		artistRoutes.init(server, config.get("server.apiKey"));
		albumRoutes.init(server, config.get("server.apiKey"));
		trackRoutes.init(server, config.get("server.apiKey"));
		
		server.listen(config.get("server.port"), ()=>{
		 	console.log(server.name, server.url, package.description);
		});
		return this;
	}
}
module.exports=App;