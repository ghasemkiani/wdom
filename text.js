//	@ghasemkiani/wdom/text

const {cutil} = require("@ghasemkiani/base/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WText extends WNode {
	get text() {
		return this.node.data;
	}
	set text(text) {
		// Is this writable?
		this.node.data = text;
	}
	toString() {
		return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	toText() {
		return this.text;
	}
}
cutil.extend(WText.prototype, {
	kind: "text",
});

module.exports = {WText};
