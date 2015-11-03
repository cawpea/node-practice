var connect = require('connect');
var errorhandler = require('errorhandler');
var notifier = require('node-notifier');

var app = connect();

if( process.env.NODE_ENV === 'development' ) {
	app.use(errorhandler({log: errorNotification}));
}
app.use( function (req, res) {
	error();
}).listen(3000);

function errorNotification( err, str, req ) {
	var title = 'Error in ' + req.method + ' ' + req.url;
	notifier.notify({
		title: title,
		message: str
	});
}