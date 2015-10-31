var connect = require( 'connect' );
var bodyParser = require( 'body-parser' );

var app = connect()
	.use( bodyParser.json() )
	.use( function ( req, res ) {
		console.log( req.body );
		// res.setHeader('Content-Type', 'text/plain');
		res.end( 'Registered new user: ' + req.body.username );
	});
app.listen(3000);