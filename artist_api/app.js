const App={
	init: function(config, package, restify, storageDecorator, model, routes, requestValidator){
		
		const server = restify.createServer({
			name: package.name,
			version: package.version
		});

		server.use(restify.plugins.acceptParser(server.acceptable));
		server.use(restify.plugins.queryParser());
		server.use(restify.plugins.bodyParser());

		routes.init(config.endpoint, server, config.security.apiKey, storageDecorator, model, requestValidator);
		
		server.listen(config.port, ()=>{
		 	console.log(server.name, server.url, package.description);
		});
		return this;
	}
}
module.exports=App;