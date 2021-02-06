//	@ghasemkiani/wdom/node

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {base} = require("@ghasemkiani/wdom/base");

class WNode extends cutil.mixin(Base, base) {
	del() {
		if(this.parent) {
			this.parent.remove(this);
		}
		return this;
	}
	toText() {
		return "";
	}
}
cutil.extend(WNode.prototype, {
	wdocument: null,
	kind: "node",
	node: null,
	parent: null,
});

module.exports = {WNode};
