//	@ghasemkiani/wdom/text

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WText extends WNode {}
cutil.extend(WText.prototype, {
	kind: "text",
	toString : function () {
		return this.node.data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
});

module.exports = {WText};
