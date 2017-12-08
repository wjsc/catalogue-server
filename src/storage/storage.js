const mongo=require('mongodb');
const config=require('config');

const Storage={
	connect: function(){
		let deferred=Promise.defer();
		mongo.MongoClient.connect('mongodb://'+config.get("storage.host")+':'+config.get("storage.port")+'/'+config.get("storage.database"), (err, db)=>{
			if(err){
				console.error(err);
				deferred.reject(err)
			}
			else{
				deferred.resolve(db);
			}
		})
		return deferred.promise;
	},
	find: function(collection, obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(collection).find(obj).toArray((err, docs)=>{
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
	findOne: function(collection, obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(collection).findOne(obj, (err, doc)=>{
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
	insert: function(collection, obj){
		let deferred=Promise.defer();
		this.connect()
		.then((db)=>{
			db.collection(collection).insert(obj, (err, result)=>{
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