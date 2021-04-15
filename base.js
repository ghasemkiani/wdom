//	@ghasemkiani/wdom/base

const {cutil} = require("@ghasemkiani/base/cutil");
const {serializable} = require("@ghasemkiani/base/serializable");

const base = cutil.extend({}, serializable, {
	chain(f, ...rest) {
		if (typeof f === "function") {
			f(this, ...rest);
		}
		return this;
	},
});

module.exports = {base};
