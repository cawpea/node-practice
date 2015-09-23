var http = require('http');
var url = require('url');
var items = [];

function getResultOfPath ( req ) {
	var statusCode;
	var text;
	var path;

	var path = url.parse(req.url).pathname;
	var i = parseInt(path.slice(1), 10);

	if( isNaN(i) ) {
		statusCode = 400;
		text = 'Invalid item id';
	} else if( !items[i] ) {
		statusCode = 400;
		text = 'Item not found';
	}else {
		statusCode = 200;
		text = 'OK\n';
		path = i;
	}
	return {
		statusCode: statusCode,
		text: text,
		path: path
	};
};
function updateItems ( index, newValue ) {
	var isUpdate = false;
	if( !items[index] ) {
		return isUpdate;
	}
	items[index] = newValue;
	isUpdate = true;
	return isUpdate;
};

var server = http.createServer(function (req, res) {
	switch( req.method ) {
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function (chunk) {
				item += chunk;
			});
			req.on('end', function () {
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			var body = items.map(function (item, i) {
				return i + ') ' + item;
			}).join('\n');
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			res.end(body);
			break;
		case 'DELETE':
			var result = getResultOfPath(req);
			if( result.statusCode === 200 ) {
				items.splice(result.path, 1);
			}
			res.statusCode = result.statusCode;
			res.end(result.text);
			break;
		case 'PUT':
			var result = getResultOfPath(req);
			if( result.statusCode !== 200 ) {
				res.statusCode = result.statusCode;
				res.end(result.text);
				return;
			}

			var item = '';
			req.setEncoding('utf8');	
			req.on('data', function ( chunk ) {
				item += chunk;
			});
			req.on('end', function () {
				var isUpdate = updateItems( result.path, item );
				if( isUpdate ) {
					res.statusCode = result.statusCode;
					res.end( result.text );
				}else {
					res.statusCode = 404;
					res.end('item is not found');
				}
			});
			break;
	}
});
server.listen(3000);