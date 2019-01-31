//	@ghasemkiani/wdom/css/rule

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {Style} = require("@ghasemkiani/wdom/css/style");
const {base} = require("@ghasemkiani/wdom/base");

class Rule extends cutil.mixin(Base, base) {}
cutil.extend(Rule.prototype, {
	selector : "*",
	_style : null,
	get style() {
		if(!this._style) {
			this._style = new Style();
		}
		return this._style;
	},
	set style(style) {
		this._style = style;
	},
	get cssText() {
		return this.style.toString();
	},
	set cssText(cssText) {
		this.style.fromString(cssText);
	},
	set css(css) {
		this.setAll(css);
	},
	fromString(string) {
		cutil.asString(string).replace(/^([^{]*){(.*)}\s*$/, function (match, selector, cssText, string) {
			this.selector = selector.trim();
			this.cssText = cssText;
		});
		return this;
	},
	toString() {
		return !this.selector ? "" : this.selector + "{" + this.cssText + "}";
	},
	get(...rest) {
		return this.style.get(...rest);
	},
	set(...rest) {
		this.style.set(...rest);
	},
	setAll(...rest) {
		this.style.setAll(...rest);
	},
});

module.exports = {Rule};
