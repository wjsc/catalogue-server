const fs=require('fs');
const Mongo=require('mongodb');
const restify=require('restify');

const config=JSON.parse(fs.readFileSync('./config.js','utf8'));
const package=JSON.parse(fs.readFileSync('./package.json','utf8'));
const storage=require('./storage.js');
const model=require(config.files.model);
const routes=require(config.files.routes);
const storageDecorator=require(config.files.storageDecorator);
const requestValidator=require(config.files.requestValidator);

storage.init( 	Mongo, 
				config.storage.host, 
				config.storage.port, 
				config.storage.database, 
				config.storage.collection,
				config.storage.keepAlive
				);

storageDecorator.init(storage);
let app=require('./app.js').init(config, package, restify, storageDecorator, model, routes, requestValidator);