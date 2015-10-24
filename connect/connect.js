var connect = require('connect');
var router = require( './middleware/router' );
var app = connect();

var routes = {
	GET: {
		'/users' : function (req, res) {
			res.end( 'tobi, loki, ferret' );
		},
		'/user/:id': function (req, res) {
			res.end( 'user ' + id );
		}
	},
	DELETE: {
		'/user/:id': function (req, res, id) {
			res.end( 'deleted user ' + id );
		}
	}
};

app
.use( setup( 'refer :method :url' ) )
.use( '/admin', restrict )
.use( '/admin', admin )
.use( hello );
app.listen(3000);

function logger ( req, res, next ) {
	console.log( '%s, %s', req.method, req.url );
	next();
}
function hello ( req, res ) {
	res.setHeader( 'Content-Type', 'text/plain' );
	res.end( 'hello world' );
}
function restrict ( req, res, next ) {
	var authorization = req.headers.authorization;
	if( !authorization ) return next( new Error('Unauthorized') );

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = Buffer( parts[1], 'base64' ).toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	//この関数は証明書をデータベースと照合してチェックする
	authenticateWithDatebase( user, pass, function (err) {
		if( err ) return next(err);
		next();
	});
}
function admin ( req, res, next ) {
	switch( req.url ) {
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader( 'Content-Type', 'application/json' );
			res.end( JSON.stringify(['tobi', 'loki', 'jane']) );
			break;
	}
}
function setup ( format ) {
	var regexp = /:(\w+)/g;

	return function logger( req, res, next ) {
		var str = format.replace( regexp, function ( match, property ) {
			return req[property];
		});
		console.log( str );
		next();
	}
}
module.exports = setup;
