//	@ghasemkiani/wdom/comment

const {cutil} = require("@ghasemkiani/base/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WComment extends WNode {
	get text() {
		return this.node.data;
	}
	set text(text) {
		// Is this writable?
		this.node.data = text;
	}
	toString() {
		return "<!--" + this.node.data + "-->";
	}
}
cutil.extend(WComment.prototype, {
	kind: "comment",
});

module.exports = {WComment};
