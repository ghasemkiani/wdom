//	@ghasemkiani/wdom/xutil

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";

class XUtil extends Obj {
	static {
		cutil.extend(this.prototype, {
			NS_HTML: "http://www.w3.org/1999/xhtml",
			NS_SVG: "http://www.w3.org/2000/svg",
			NS_MATHML: "http://www.w3.org/1998/Math/MathML",
		});
	}
	unescape(s) {
		s = cutil.asString(s);
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&quot;/g, '"');
		s = s.replace(/&amp;/g, "&");
		return s;
	}
	escape(s) {
		s = cutil.asString(s);
		s = s.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/"/g, "&quot;");
		return s;
	}
	toCamelCase(name) {
		return !name ? "" : cutil.asString(name).replace(/\-(.)/g, function (match, letter) {
			return letter.toUpperCase();
		});
	}
	toDashed(name) {
		return !name ? "" : cutil.asString(name).replace(/[A-Z]/g, function (match) {
			return "-" + match.toLowerCase();
		});
	}
}

const xutil = new XUtil();

export {XUtil, xutil};
