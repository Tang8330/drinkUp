var passport = require('passport'),
    Account = require('./models/account');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = function (app) {
	app.get('/', function(req, res) {
		res.render('index');
		//do something
	});
}