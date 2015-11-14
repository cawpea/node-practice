var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var compress = require('compression');

var app = connect()
	.use(compress())
	.use(serveIndex( __dirname + '/html' ))
	.use(serveStatic( __dirname + '/html'))
	.listen(3000);