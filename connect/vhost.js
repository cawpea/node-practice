var connect = require( 'connect' );
var vhost = require('vhost');
var server = connect();

server.use( vhost('test', function (req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello!');
}));

server.listen( 3000 );