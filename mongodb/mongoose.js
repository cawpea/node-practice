var mongoose = require( 'mongoose' );
var db = mongoose.connect( 'mongodb://localhost/tasks' );

registSchema();
var Task = mongoose.model( 'Task' );

// addTask();
//findDocument();
// updateDocument();
deleteDocument();
		
function registSchema () {
	var Schema = mongoose.Schema;
	var Tasks = new Schema({
		project: String,
		description: String
	});
	mongoose.model( 'Task', Tasks );
}
function addTask () {
	var task = new Task();
	task.project = 'Bikeshed';
	task.description = 'Paint the bikeshed red.';
	task.save( function (err)  {
		if ( err ) throw err;
		console.log( 'Task saved.' );
	});
}
function findDocument () {
	Task.find( {'project': 'Bikeshed'}, function ( err, tasks ) {
		for ( var i = 0; i < tasks.length; i++ ) {
			console.log( 'ID: ' + tasks[i]._id );
			console.log( tasks[i].description );
		}
	});
}
function updateDocument () {
	var Task = mongoose.model( 'Task' );
	Task.update(
		{ _id: '56222c7e0ecdf8c41a24ade0' },
		{ description: 'Paint the bikeshed green.' },
		{multi: false},
		function ( err, rows_updated ) {
			if ( err ) throw err;
			console.log( 'Updated' );
		}
	);
}
function deleteDocument () {
	Task.findById( '56222c7e0ecdf8c41a24ade0', function ( err, task ) {
		task.remove();
		console.log( 'Deleted' );
	});
}