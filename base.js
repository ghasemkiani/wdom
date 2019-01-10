//	@ghasemkiani/wdom/base

const base = {
	chain(f, ...rest) {
		if (typeof f === "function") {
			f(this, ...rest);
		}
		return this;
	},
};

module.exports = {base};
