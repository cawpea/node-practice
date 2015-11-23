var mongoose = require('mongoose');
//ローカルホスト上のmongodbと接続し、データベースとしてphoto.appを使う設定
mongoose.connect( 'mongodb://localhost/photo_app' );

var schema = new mongoose.Schema({
	name: String,
	path: String
});
module.exports = mongoose.model( 'Photo', schema );