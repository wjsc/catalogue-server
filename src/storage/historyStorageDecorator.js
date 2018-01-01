const storage = require(__dirname + '/storage.js');
const collection = 'historys';

const historyStorageDecorator={
	getHistory: function(user){
		return storage.find(collection, {user});
	},
	insertHistory: function(history){
		return storage.insert(collection, history);
	}
}
module.exports=historyStorageDecorator;