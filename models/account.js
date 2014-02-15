var mongoose = require('mongoose')
, Schema = mongoose.Schema
, passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    name: String
});

Account.plugin(passportLocalMongoose);

var MyAcc = mongoose.model('Account', Account);

var sendInvitations = function(id, req_obj, callback) {
	MyAcc.findByIdAndUpdate(
		id,
		{
			invitiations : req_obj.teamName
		},
		callback);
};

var setAccountInfo = function(req_obj, callback){
	if (!req_obj.name) req_obj.name = null
	if (!req_obj.desc) req_obj.desc = null
	if (!req_obj.role) req_obj.role = null
	MyAcc.findByIdAndUpdate(
		req_obj.id,
		{
			name : req_obj.name,
			desc : req_obj.desc,
			role : req_obj.role
		},
		callback);
};

/** 
 * authenticate2
 *
 * authenticates a user/email and password
 */
var authenticate2 = function(){

	var self = this;

	return function (username, password, cb) {
		self.findByUsername(username, function (err, user) {

			if (err) {return cb(err);}
			if (user) {
				return user.authenticate(password, cb);
			} else {
				self.getAccByEmail(username, function (err, emailer){
					if (emailer) {
						return emailer.authenticate(password, cb);
					} else {
						return cb(null, false, { message: 'Invalid login credentials' });
					}
				});
			}
		});
	}
}

/** 
 * accountByID
 *
 * @param {string} - id, surveyId
 * @param {callback}
 *
 * gets an account by its ID.
 */
var findByID = function(query, callback) {
	MyAcc.findById(
		query,	
		null,
		{},
			function(err, collection) {
				if (err) {
					callback(err, null);
				}
				else {
					callback(null, collection);
				}
			}
		)
};

var findAllUsernames = function(callback){
	MyAcc.find(
		null,
		null,
		callback
		);
};
/** 
 * getAccountByUser
 *
 * @param {string} - user, username
 * @param {cb}
 *
 * finds the account object with username 'user'
 */
 var getAccountByUser = function(user, callback) {
		MyAcc.findOne(
		{username : user},
		null,{},
		function(err, result) {
			if (err) {
				//Error
				callback(err, null);
			}
			else {
				callback(err, result);
			}
		}
	)
	
};//doesItExist
module.exports = mongoose.model('Account', Account);
module.exports.setAccountInfo = setAccountInfo;
module.exports.authenticate2 = authenticate2;
module.exports.findByID = findByID;
module.exports.findAllUsernames = findAllUsernames;
module.exports.getAccountByUser = getAccountByUser;
module.exports.sendInvitations = sendInvitations;