//	@ghasemkiani/wdom/text

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WText extends WNode {}
cutil.extend(WText.prototype, {
	kind: "text",
	get text() {
		return this.node.data;
	},
	set text(text) {
		// Is this writable?
		this.node.data = text;
	},
	toString : function () {
		return this.node.data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
});

module.exports = {WText};
