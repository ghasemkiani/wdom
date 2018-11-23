//	@ghasemkiani/wdom/comment

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WComment extends WNode {}
cutil.extend(WComment.prototype, {
	kind: "comment",
	toString : function () {
		return "<!--" + this.node.data + "-->";
	},
});

module.exports = {WComment};
