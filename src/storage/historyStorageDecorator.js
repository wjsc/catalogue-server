const storage = require(__dirname + '/storage.js');
const collection = 'historys';

const historyStorageDecorator={
	getHistory: function(user, offset, limit){
		return storage.find(collection, {user}, offset, limit, {date:-1});
	},
	insertHistory: function(history){
		return storage.insert(collection, history);
	}
}
module.exports=historyStorageDecorator;