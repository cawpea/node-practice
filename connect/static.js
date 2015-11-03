var connect = require('connect');
var serveStatic = require('serve-static');

var serve = serveStatic('html', {'index': ['default.html']});
var app = connect()
	.use(serve).listen(3000);