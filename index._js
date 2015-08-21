"use strict";
var fs = require('fs');

var exports = module.exports = Object.create(fs);

exports.exists = function(path, cb) {
	fs.exists(path, function(result) {
		cb(null, result);
	});
};
