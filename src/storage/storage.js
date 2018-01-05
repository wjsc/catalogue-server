const mongo=require('mongodb');
const config=require('config');

const Storage={
	connect: function(){
		return mongo.MongoClient.connect('mongodb://'+config.get("storage.host")+':'+config.get("storage.port")+'/'+config.get("storage.database"));
	},
	find: function(collection, obj){
		return new Promise((resolve, reject) => {
			this.connect()
			.then( db => {
				db.collection(collection).find(obj).toArray((err, docs)=>{
					db.close();
					err ? reject(err) : resolve(docs);
				});
			})
		})
	},
	findOne: function(collection, obj){
		return new Promise((resolve, reject) => {
			this.connect()
			.then( db => {
				db.collection(collection).findOne(obj, (err, doc)=>{
					db.close();
					err ? reject(err) : resolve(doc);
				});
			})
		})
	},
	insert: function(collection, obj){
		return new Promise((resolve, reject) => {
			this.connect()
			.then( db => {
				db.collection(collection).insert(obj, (err, result)=>{
					db.close();
					err ? deferred.reject(err)
					: Array.isArray(obj) ? deferred.resolve({ids: result.insertedIds})
									 	 : deferred.resolve({id: result.insertedIds[0]});
				});
			})
		})
	},
	delete: function(collection, obj){
		return new Promise((resolve, reject) => {
			this.connect()
			.then( db => {
				db.collection(collection).remove(obj, (err, result)=>{
					db.close();
					err ? reject(err) : resolve(result);
				});
			})
		})
	}
}
module.exports=Storage;