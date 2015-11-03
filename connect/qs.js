var connect = require('connect');
var query = require('connect-query');
var url = require('url');

var app = connect()
	.use( query() )
	.use( function ( req, res, next ) {
		res.setHeader( 'Content-Type', 'application/json' );
		res.end( JSON.stringify( req.query ) );
	});
app.listen(3000);

connect.logger.token( 'query-string', function ( req, res ) {
	return url.parse( req.url ).query;
});