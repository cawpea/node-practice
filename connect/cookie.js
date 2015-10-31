var connect = require('connect');
var Cookies = require('cookies');

var app = connect()
	.use( function( req, res ) {
		outputCookies( req, res );
		res.end('hello');
	})
	.listen(3000);

function outputCookies ( req, res ) {
	var cookies = new Cookies( req, res );
	console.log( 'foo is ' + cookies.get( 'foo' ) );
	console.log( 'bar is ' + cookies.get( 'bar' ) );
}