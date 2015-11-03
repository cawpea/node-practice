var connect = require('connect');
var auth = require('basic-auth');
var users = {
	'user1': 'pass1',
	'user2': 'pass2',
	'user3': 'pass3'
};

var app = connect()
	.use( function ( req, res ) {
		var credentials = auth( req );

		if( !credentials || users[credentials.name] !== credentials.pass ) {
			res.statusCode = 401;
			res.setHeader( 'Content-Type', 'text/plain' );
			res.end( 'Access denied' );
		}else {
			res.end( 'I\'m a secret\n' );
		}
	});
app.listen(3000);