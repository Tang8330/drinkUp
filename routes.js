var passport = require('passport'),
    Account = require('./models/account');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = function (app) {
	app.get('/', function(req, res) {
		app.get('/', function(req, res) {
  var date = new Date();
 
  res.writeHead(200, {
    'Date':date.toUTCString(),
    'Connection':'close',
    'Cache-Control':'private',
    'Content-Type':'video/webm',
    'Server':'CustomStreamer/0.0.1',
  });
 
  var tcpServer = net.createServer(function (socket) {
    socket.on('data', function (data) {
      res.write(data);
    });
    socket.on('close', function(had_error) {
      res.end();
    });
  });
 
  tcpServer.maxConnections = 1;
 
  tcpServer.listen(function() {
    var cmd = 'gst-launch-0.10';
    var options = null;
    var args = 
      ['videotestsrc', 'horizontal-speed=1', 'is-live=1',
      '!', 'video/x-raw-rgb,framerate=30/1',
      '!', 'ffmpegcolorspace',
      '!', 'vp8enc', 'speed=2',
      '!', 'queue2',
      '!', 'm.', 'audiotestsrc', 'is-live=1',
      '!', 'audioconvert',
      '!', 'vorbisenc',
      '!', 'queue2',
      '!', 'm.', 'webmmux', 'name=m', 'streamable=true',
      '!', 'tcpclientsink', 'host=localhost',
      'port='+tcpServer.address().port];
 
    var gstMuxer = child.spawn(cmd, args, options);
 
    gstMuxer.stderr.on('data', onSpawnError);
    gstMuxer.on('exit', onSpawnExit);
 
    res.connection.on('close', function() {
      gstMuxer.kill();
    });
  });
});
 
	});
	app.get('/order', function(req, res) {
		res.render('menu');
	});
	app.get('/about', function(req, res) {
		res.render('about');
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
	app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });
	app.post('/register', function(req, res) {
		console.log('called');
		console.log(req.body.username);
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
			if (err) {
                return res.render('register', { account : account });
            }
            res.redirect('/');
        });
    });
}