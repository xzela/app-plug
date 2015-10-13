var uuid = require('uuid');

module.exports = {
	id: function () {
		'use strict';
		return uuid.v1();
	},
	add: function (a,b) {
		'use strict';

		return a + b;
	}
};
