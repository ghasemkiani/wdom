//	@ghasemkiani/wdom/xutil

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");

class XUtil extends Base {}
cutil.extend(XUtil.prototype, {
	NS_HTML: "http://www.w3.org/1999/xhtml",
	NS_SVG: "http://www.w3.org/2000/svg",
	NS_MATHML: "http://www.w3.org/1998/Math/MathML",
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
	toCamelCase(name) {
		return !name ? "" : cutil.asString(name).replace(/\-(.)/g, function (match, letter) {
			return letter.toUpperCase();
		});
	},
	toDashed(name) {
		return !name ? "" : cutil.asString(name).replace(/[A-Z]/g, function (match) {
			return "-" + match.toLowerCase();
		});
	},
});

const xutil = new XUtil();

module.exports = {
	XUtil,
	xutil,
};
