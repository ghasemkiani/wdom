//	@ghasemkiani/wdom/comment

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WComment extends WNode {}
cutil.extend(WComment.prototype, {
	kind: "comment",
	get text() {
		return this.node.data;
	},
	set text(text) {
		// Is this writable?
		this.node.data = text;
	},
	toString : function () {
		return "<!--" + this.node.data + "-->";
	},
});

module.exports = {WComment};
