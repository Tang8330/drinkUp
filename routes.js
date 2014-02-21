var passport = require('passport'),
    Account = require('./models/account');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = function (app) {
	app.get('/', function(req, res) {
		res.render('index', { user : req.user});
	});	
	app.get('/order', function(req, res) {
		res.render('menu', { user : req.user});
	});
	app.get('/about', function(req, res) {
		res.render('about', { user : req.user});
	});
	app.get('/register', function(req, res) {
		res.render('register');
	});
	app.get('/forgot', function(req, res) {
		res.render('forgot_password');
	});
	app.get('/404', function(req, res) {
		res.render('404');
	});
	app.get('/login', function(req, res) {
		res.render('login');
	});
	app.get('/signout', function(req, res) {
		req.logout();
		res.redirect("/");
	});
	app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });
	app.post('/register', function(req, res) {
		console.log(req.body.username);
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
			if (err) {
                return res.render('register', { account : account });
            }
            res.redirect('/');
        });
    });
}