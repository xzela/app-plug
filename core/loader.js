var path = require('path');

function _rootPath(uri) {
	var file = path.basename(uri);
	uri = uri.replace(file, '');
	return uri;
}

function init(callback) {
	var source = path.join(
			_rootPath(require.main.filename),
			'plugins'
		);
	// do dependency install here!
	//
	require.main.paths.unshift(source);
	return callback && callback();
}

module.exports = {
	init: init
};
