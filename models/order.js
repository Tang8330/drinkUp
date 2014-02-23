var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var Order = new Schema({
    name: String,
	user: String,
	details: [],
	total: Number,
	status: {type : String, default : "Incomplete"},
	dateAdded: {type : Date, default : Date.now}
});

var MyOrder = mongoose.model('Order', Order);

var insertOrder = function(req_obj, user, order, total, callback ) {
	var instance = new MyOrder();
	instance.name = req_obj.name;
	instance.user = user;
	instance.details = order;
	instance.total = total;
	instance.save( function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null);
		}
	});
};

var sendInvitations = function(id, req_obj, callback) {
	MyOrder.findByIdAndUpdate(
		id,
		{
			invitiations : req_obj.teamName
		},
		callback);
};

var setOrderInfo = function(req_obj, callback){
	if (!req_obj.name) req_obj.name = null
	if (!req_obj.desc) req_obj.desc = null
	if (!req_obj.role) req_obj.role = null
	MyOrder.findByIdAndUpdate(
		req_obj.id,
		{
			name : req_obj.name,
			desc : req_obj.desc,
			role : req_obj.role
		},
		callback);
};

/** 
 * OrderByID
 *
 * @param {string} - id, surveyId
 * @param {callback}
 *
 * gets an Order by its ID.
 */
var findByID = function(query, callback) {
	MyOrder.findById(
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
	MyOrder.find(
		null,
		null,
		callback
		);
};
/** 
 * getOrderByUser
 *
 * @param {string} - user, username
 * @param {cb}
 *
 * finds the Order object with username 'user'
 */
 var getOrderByUser = function(user, callback) {
		MyOrder.findOne(
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

var getOrders = function(query, callback) {
		MyOrder.find(
		{status : query},
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

module.exports = mongoose.model('Order', Order);
module.exports.setOrderInfo = setOrderInfo;
module.exports.findByID = findByID;
module.exports.findAllUsernames = findAllUsernames;
module.exports.getOrderByUser = getOrderByUser;
module.exports.sendInvitations = sendInvitations;
module.exports.insertOrder = insertOrder;
module.exports.getOrders = getOrders;