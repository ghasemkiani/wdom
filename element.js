//	@ghasemkiani/wdom/element

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WElement extends WNode {}
cutil.extend(WElement.prototype, {
	kind: "element",
	_wnodes: null,
	get wnodes() {
		if(!this._wnodes) {
			this._wnodes = [];
		}
		return this._wnodes;
	},
	set wnodes(wnodes) {
		this._wnodes = wnodes;
	},
	toString : function () {
		return this.node.outerHTML;
	},
});

module.exports = {WElement};
