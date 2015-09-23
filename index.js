var loader = require('./core/loader.js');

loader.init(function _init() {
	console.log("loaded...");
	var tp = require('test-plugin');
	console.log(tp.add(1,2));
});
