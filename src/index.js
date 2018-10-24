const path = require('path')

module.exports = {

	processors: {
		'.js': {
			preprocess(text, filename) {
				return [ text.replace(/(^\s*)import\s+'([^']+)'(\s*$)/gm, (original, leading, importPath, trailing) => {
					if(importPath.indexOf('/') < 0) {
						return original;
					}

					const name = path.basename(importPath)

					if(name.indexOf('.') >= 0) {
						return original
					}

					return `${leading}import { ${name} } from '${importPath}'${trailing}`
				}) ]
			},

			postprocess(messages, filename) {
				return messages.reduce((a, b) => a.concat(b))
			}
		}
	}

}
