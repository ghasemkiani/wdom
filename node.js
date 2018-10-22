//	@ghasemkiani/wdom/node

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {base} = require("@ghasemkiani/wdom/base");

class WNode extends cutil.mixin(Base, base) {}
cutil.extend(WNode.prototype, {
	node: null,
	chain(f) {
		if(typeof f === "function") {
			this.call(f, this);
		}
		return this;
	},
});

module.exports = {
	WNode,
};
