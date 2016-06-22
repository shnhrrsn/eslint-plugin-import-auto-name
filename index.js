var path = require('path');

module.exports = {

	processors: {
		".js": {
			preprocess: function(text, filename) {
				return [ text.replace(/(^\s*)import\s+'([^']+)'(\s*$)/gm, function(original, leading, importPath, trailing) {
					if(importPath.indexOf('/') < 0) {
						return original;
					}

					var name = path.basename(importPath);

					if(name.indexOf('.') >= 0) {
						return original;
					}

					return leading + 'import {' + name + '} from \'' + importPath + '\'' + trailing
				}) ];
			},

			postprocess: function(messages, filename) {
				return messages.reduce(function(a, b) {
					return a.concat(b)
				})
			}
		}
	}

};
