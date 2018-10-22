//	@ghasemkiani/wdom/comment

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WComment extends Node {}
cutil.extend(WComment.prototype, {
	//
});

module.exports = {
	WComment,
};
