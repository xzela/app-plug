var async = require('async'),
	path = require('path'),
	fs = require('fs'),
	npm = require('npm'),
	readJson = require('read-package-json');

function _rootPath(uri) {
	'use strict';

	var file = path.basename(uri);
	uri = uri.replace(file, '');
	return uri;
}

function init(callback) {
	'use strict';

	var source = path.join(
			_rootPath(require.main.filename),
			'plugins'
		);



	async.waterfall([
		function _dirs(cb) {
			var dirs = fs.readdirSync(source);
			var packages = [];
			for (var i = 0; i < dirs.length; i++) {
				var dir = path.join(source, dirs[i]);
				var sts = fs.statSync(dir);
				if (sts.isDirectory()) {
					var p = path.join(dir, 'package.json');

					if(fs.existsSync(p)) {
						console.log(p);
						packages.push(p);
					}
				}
			}
			return cb(null, packages);
		},
		/**
		 * Loads up the json!
		 *
		 * @param  {[type]}   packages [description]
		 * @param  {Function} cb       [description]
		 * @return {[type]}            [description]
		 */
		function _json(packages, cb) {
			var depends = [];
			console.log('packages', packages);
			async.each(packages, function(item, cb2) {
				readJson(item, function (err, item) {
					for (var dp in item.dependencies) {
						depends.push(dp + '@' + item.dependencies[dp]);
					}
					return cb2();
				});
			}, function __done(er) {
				return cb(null, depends);
			});
		},
		function _load(depends, cb) {
			console.log('depends', depends);
			npm.load({loaded: false}, function (err, data) {
				npm.commands.install(depends, function(err, data) {
					return cb(null, data);
				});
			});
		}
	], function __done(err, results) {
		console.log(results);
		require.main.paths.unshift(source);
		return callback && callback();
	});
	// // do dependency install here!
	// //
	//
	// npm.load({ loaded: false}, function (err) {
	// 	if (err) {
	// 		throw err;
	// 	}
	// 	npm.commands.install([], function (err, data) {
	// 		if (err) {
	// 			throw err;
	// 		}

	// 	});
	//
	// });
}

module.exports = {
	init: init
};
