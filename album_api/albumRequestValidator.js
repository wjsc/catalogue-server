
function sendIncorrectRequest(res, next, msg){
	res.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
	res.end(JSON.stringify({message: msg}));
	return next(false);
};
module.exports.validateGet=function(req, res, next){
	if(false){
		return sendIncorrectRequest(res, next, 'Incorrect request. ');
	}
	return next();
};
module.exports.validateGetById=function(req, res, next){
	if(false){
		return sendIncorrectRequest(res, next, 'Incorrect request. ');
	}
	return next();
};
module.exports.validateGetSearch=function(req, res, next){
	if(false){
		return sendIncorrectRequest(res, next, 'Incorrect request. ');
	}
	return next();
};
module.exports.validatePost=function(req, res, next){
	if(false){
		return sendIncorrectRequest(res, next, 'Incorrect request. ');
	}
	return next();
};
module.exports.validatePut=function(req, res, next){
	if(false){
		return sendIncorrectRequest(res, next, 'Incorrect request. ');
	}
	return next();
};
module.exports.validateDel=function(req, res, next){
	if(false){
		return sendIncorrectRequest(res, next, 'Incorrect request. ');
	}
	return next();
};
