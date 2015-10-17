var mongodb = require('mongodb');
var server = new mongodb.Server( '127.0.0.1', 27017, {} );

var client = new mongodb.Db( 'mydatabase', server, {w:1} );

client.open( function (err) {
	if ( err ) throw err;
	client.collection( 'test_insert', function ( err, collection ) {
		if ( err ) throw err;
		console.log( 'We are now able to perform queries.' );

		//insertDocument( collection );
		//updateDocument( collection );
		//findDocuments( collection );
		deleteDocument( collection );
	});
});

function insertDocument ( collection ) {
	collection.insert( {
		'title': 'I like cake',
		'body': 'It is quite good.'
	}, {
		safe: true
	}, function ( err, documents ) {
		if ( err ) throw err;
			for( key in documents ) {
			console.log( 'Documents is ' + documents + ', key is ' + key + ', value is ' + documents[key] );
		}
	});
}
function updateDocument ( collection ) {
	var _id = mongodb.ObjectID('562214b972945494041db3aa');
	console.log( 'id is ' + _id );
	collection.update(
		{ _id: _id },
		{$set: {'title': 'I ate too muc cake'}},
		{safe: true},
		function (err) {
			if (err) throw err;
			console.log( 'Update complete.' );
		}
	);
}
function findDocuments ( collection ) {
	collection.find(
		{'title': 'I like cake'}
	).toArray( function ( err, results ) {
		if ( err ) throw err;
		console.log( results );
	});
}
function deleteDocument ( collection ) {
	var _id = mongodb.ObjectID('5622198d541b9f600ee0b1aa');
	collection.remove(
		{_id: _id},
		{safe: true},
		function (err) {
			if (err) throw err;
			console.log( 'Delete complete.' );
		}
	);
}