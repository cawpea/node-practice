var connect = require('connect');

connect()
	.use( dispatchError() )
	.use( errorHandler() )
.listen(3000);

function dispatchError () {
	return function ( req, res ) {
		foo();
		res.setHeader( 'Content-Type', 'text/plain' );
		res.end('hello world');
	}
}
function errorHandler () {
	var env = process.env.NODE_ENV || 'development';
	return function ( err, req, res, next ) {
		res.statusCode = 500;
		switch( env ) {
			case 'development':
				res.setHeader( 'Content-Type', 'application/json' );
				res.end( JSON.stringify( err ) );
				break;
			default:
				res.setHeader( 'Content-Type', 'text/html' );
				res.end( 'Server Error' );
				break;
		}
	}
}
