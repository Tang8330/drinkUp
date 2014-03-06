var passport = require('passport'),
    Account = require('./models/account'),
	Order = require("./models/order"),
	moment = require("moment");

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
	
	app.get("/orders", ensureAuthenticated, function(req, res) {
		res.render("orders", { user : req.user});
	});
	
	app.get("/getOrders", ensureAuthenticated, function(req, res) {
		var results = new Array();
		Order.getOrders("Incomplete", function(err, collection) {
			for (var i = 0 ; i < collection.length; i++ ) {
				var result = new Object();
				result.id = collection[i]._id
				result.total = collection[i].total;
				result.name = collection[i].name;
				result.detail = collection[i].details;
				// - 5 hrs
				result.added =  moment(collection[i].dateAdded).zone('-0500').format('h:mm a');
				results.push(result);
			}
			res.send(results);
		});
	});
	
	app.get("/getOrders/:id", ensureAuthenticated, function(req, res) {
		var results = new Array();
		Order.findByID(req.params.id, function(err, collection) {
			var result = new Object();
			result.id = collection._id
			result.total = collection.total;
			result.name = collection.name;
			result.detail = collection.details;
			result.added =  moment(collection.dateAdded).zone('-0500').format('h:mm a');
			res.send(result);
		});
	});
	
	app.post("/order", function(req, res) {
		if (req.user) {
			Order.insertOrder(req.body, req.user.username, JSON.parse(req.cookies.order), req.cookies.subtotal, function(err) {
				res.redirect("back");
			});
		}
		else {
			Order.insertOrder(req.body, null, JSON.parse(req.cookies.order), req.cookies.subtotal,function(err) {
				res.redirect("back");
			});
		}
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