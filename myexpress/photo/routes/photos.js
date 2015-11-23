var model = require('../models/photo');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var join = path.join;

//テスト用の写真データ
// var photos = [];
// photos.push({
// 	name: 'new Google logo',
// 	path: 'http://www.popsci.com/sites/popsci.com/files/styles/large_1x_/public/new-google-logo.jpg?itok=ZdIobGek'
// });
// photos.push({
// 	name: 'old Google logo',
// 	path: 'http://api.ning.com/files/GTT*uiEbDrqF65QG9Z2mOPEep6-UKGEkgedZ8cqwD1wXXPQye*eElgo6dPfVsljM6-gBdiCv2krET6EVCUuukAHmuWZAI6di/google.jpg'
// });
exports.list = function ( req, res ) {
	model.find({}, function (err, photos) {
		if (err) return next(err);
		res.render('photos', {
			title: 'Photos',
			photos: photos
		});
	});
};
exports.form = function ( req, res ) {
	res.render('photos/upload', {
		title: 'Photo upload'
	});
};
exports.submit = function (dir) {
	return function ( req, res, next ) {
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8';
		form.uploadDir = dir;
		form.parse( req, function ( err, fields, files ) {
			res.writeHead(200, {'content-type': 'text/html'});
			res.write('received upload:\n\n');
			res.end( util.inspect({fields: fields, files: files}) );

			var img = files.photoImage;
			var name = fields.photoName || img.name;
			var path = join( dir, name );

			fs.rename( img.path, path, function (err) {
				if( err ) throw err;
				model.create({
					name: name,
					path: name
				}, function (err) {
					if (err) return next(err);
				});
			});
		});
	};
};
exports.download = function (dir) {
	return function ( req, res, next ) {
		var id = req.params.id;
		model.findById( id, function (err, photo) {
			if( err ) return next(err);
			var path = join( dir, photo.path );
			// res.sendFile( path );
			res.download( path, 'sampleimage.jpeg' );
		});
	};
};