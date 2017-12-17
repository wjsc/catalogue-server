const mongo=require('mongodb');
const config=require('config');

const Storage={
	connect: function(){
		let deferred=Promise.defer();
		mongo.MongoClient.connect('mongodb://'+config.get("storage.host")+':'+config.get("storage.port")+'/'+config.get("storage.database"), (err, db)=>{
			err ? deferred.reject(err)
				: deferred.resolve(db);
			
		})
		return deferred.promise;
	},
	find: function(collection, obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(collection).find(obj).toArray((err, docs)=>{
				db.close();
				err ? deferred.reject(err)
					: deferred.resolve(docs);
			});
		})
		.catch((err)=>{
			deferred.reject(err);
		})
		return deferred.promise;
	},
	findOne: function(collection, obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(collection).findOne(obj, (err, doc)=>{
				db.close();
				err ? deferred.reject(err)
				: deferred.resolve(doc);
			});
		})
		.catch((err)=>{
			deferred.reject(err);
		})
		return deferred.promise;
	},
	insert: function(collection, obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(collection).insert(obj, (err, result)=>{
				db.close();
				err ? deferred.reject(err)
					: Array.isArray(obj) ? deferred.resolve({ids: result.insertedIds})
									 	 : deferred.resolve({id: result.insertedIds[0]});
			})
		})
		.catch((err)=>{
			deferred.reject(err);
		})
		return deferred.promise;
	}
}
module.exports=Storage;