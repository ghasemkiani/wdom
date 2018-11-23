//	@ghasemkiani/wdom/xutil

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");

class XUtil extends Base {}
cutil.extend(XUtil.prototype, {
	unescape(s) {
		s = cutil.asString(s);
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&quot;/g, '"');
		s = s.replace(/&amp;/g, "&");
		return s;
	},
	escape(s) {
		s = cutil.asString(s);
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/"/g, "&quot;");
		s = s.replace(/&/g, "&amp;");
		return s;
	},
});

const xutil = new XUtil();

module.exports = {
	XUtil,
	xutil,
};
