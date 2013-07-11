var fs = require('fs');

var exports = module.exports = Object.create(fs);

exports.exists = function(path, _) {
	return (function(cb) {
		fs.exists(path, function(result) {
			cb(null, result);
		});
	})(~_);
};

// We only need the rest of the wrapper if running with a fast option. So test and bail out here
if (!/-fast$/.test(require('streamline/lib/globals').runtime)) return;

function wrap(name, count, opt) {
	switch (count) {
		case 1:
			exports[name] = function(a, _) {
				return fs[name](a, ~_);
			};
			break;
		case 2:
			exports[name] = opt ? function(a, b, _) {
				return typeof b === "function" ? fs[name](a, ~_) : fs[name](a, b, ~_);
			} : function(a, b, _) {
				return fs[name](a, b, ~_);
			};
			break;
		case 3:
			exports[name] = opt ? function(a, b, c, _) {
				return typeof c === "function" ? fs[name](a, b, ~_) : fs[name](a, b, c, ~_);
			} : function(a, b, c, _) {
				return fs[name](a, b, c, ~_);
			};
			break;
		case 5:
			exports[name] = function(a, b, c, d, e, _) {
				return fs[name](a, b, c, d, e, ~_);
			};
			break;
		default:
			throw new Error("bad count " + count);
	}
}

wrap('rename', 2);
wrap('truncate', 2);
wrap('ftruncate', 2);
wrap('chown', 3);
wrap('lchown', 3);
wrap('fchown', 3);
wrap('chmod', 2);
wrap('lchmod', 2);
wrap('fchmod', 2);
wrap('stat', 1);
wrap('lstat', 1);
wrap('fstat', 1);
wrap('link', 2);
wrap('symlink', 2);
wrap('readlink', 1);
wrap('realpath', 2, true);
wrap('unlink', 1);
wrap('rmdir', 1);
wrap('mkdir', 2, true);
wrap('readdir', 1);
wrap('open', 3, true);
wrap('close', 1);
wrap('read', 5);
wrap('write', 5);
wrap('fsync', 1);
wrap('utimes', 3);
wrap('futimes', 3);
wrap('readFile', 2, true);
wrap('writeFile', 3, true);
wrap('appendFile', 3, true);