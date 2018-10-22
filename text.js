//	@ghasemkiani/wdom/text

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");

class WText extends WNode {}
cutil.extend(WText.prototype, {
	//
});

module.exports = {
	WText,
};
