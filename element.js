//	@ghasemkiani/wdom/element

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WElement extends WNode {}
cutil.extend(WElement.prototype, {
	//
});

module.exports = {WElement};
