var photos = [];
photos.push({
	name: 'new Google logo',
	path: 'http://www.popsci.com/sites/popsci.com/files/styles/large_1x_/public/new-google-logo.jpg?itok=ZdIobGek'
});
photos.push({
	name: 'old Google logo',
	path: 'http://api.ning.com/files/GTT*uiEbDrqF65QG9Z2mOPEep6-UKGEkgedZ8cqwD1wXXPQye*eElgo6dPfVsljM6-gBdiCv2krET6EVCUuukAHmuWZAI6di/google.jpg'
});
exports.list = function ( req, res ) {
	res.render('photos', {
		title: 'Photos',
		photos: photos
	});
};