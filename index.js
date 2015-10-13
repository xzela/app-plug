var loader = require('./core/loader.js');

loader.init(function _init() {
	'use strict';

	console.log("loaded...");
	var tp = require('test-plugin');
	console.log(tp.add(1,2));
	console.log(tp.id());
});
