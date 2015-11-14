var connect = require('connect');
var serveStatic = require('serve-static');
var compress = require('compression');

var app = connect()
	.use(compress())
	.use(serveStatic( __dirname + '/html', {'index': ['default.html']})).listen(3000);