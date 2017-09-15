const Storage={
	init: function(mongo, host, port, database, collection){
		this.Mongo=mongo;
		this.host=host;
		this.port=port;
		this.database=database;
		this.collection=collection;
		return this;
	},
	connect: function(){
		let deferred=Promise.defer();
		this.Mongo.MongoClient.connect('mongodb://'+this.host+':'+this.port+'/'+this.database, (err, db)=>{
			if(err){
				console.log(err);
				deferred.reject(err)
			}
			else{
				deferred.resolve(db);
			}
		})
		return deferred.promise;
	},
	find: function(obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(this.collection).find(obj).toArray((err, docs)=>{
				db.close();
				if(err) {
					deferred.reject(err);
				}
				else{
					deferred.resolve(docs);
				}
			});
		})
		.catch((err)=>{
			deferred.reject(err);
		})
		return deferred.promise;
	},
	findOne: function(obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(this.collection).findOne(obj, (err, doc)=>{
				db.close();
				if(err) {
					deferred.reject(err);
				}
				else{
					deferred.resolve(doc);
				}
			});
		})
		.catch((err)=>{
			deferred.reject(err);
		})
		return deferred.promise;
	},
	insert: function(obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(this.collection).insert(obj, (err, result)=>{
				db.close();
				if(err) {
					deferred.reject(err);
				}
				else{
					deferred.resolve(result);
				}
			})
		})
		.catch((err)=>{
			deferred.reject(err);
		})
		return deferred.promise;
	}
}
module.exports=Storage;