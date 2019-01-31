//	@ghasemkiani/wdom/base

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {serializable} = require("@ghasemkiani/commonbase/serializable");

const base = cutil.extend({}, serializable, {
	chain(f, ...rest) {
		if (typeof f === "function") {
			f(this, ...rest);
		}
		return this;
	},
});

module.exports = {base};
