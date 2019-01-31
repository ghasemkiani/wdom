//	@ghasemkiani/wdom/css/ruleset

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {Stylesheet} = require("@ghasemkiani/wdom/css/stylesheet");
const {base} = require("@ghasemkiani/wdom/base");

class RuleSet extends cutil.mixin(Base, base) {}
cutil.extend(RuleSet.prototype, {
	selector : "@media screen",
	_stylesheet : null,
	get stylesheet() {
		if(!this._stylesheet) {
			this._stylesheet = new Stylesheet();
		}
		return this._stylesheet;
	},
	set stylesheet(stylesheet) {
		this._stylesheet = stylesheet;
	},
	get cssText() {
		return this.stylesheet.toString();
	},
	toString() {
		return !this.selector ? "" : this.selector + "{" + this.cssText + "}";
	},
});

module.exports = {RuleSet};
