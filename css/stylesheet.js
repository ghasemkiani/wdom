//	@ghasemkiani/wdom/css/stylesheet

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {base} = require("@ghasemkiani/wdom/base");
const {Style} = require("@ghasemkiani/wdom/css/style");

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

class Stylesheet extends cutil.mixin(Base, base) {}
cutil.extend(Stylesheet.prototype, {
	mime: "text/css",
	_rules : null,
	get rules() {
		if(!this._rules) {
			this._rules = [];
		}
		return this._rules;
	},
	set rules(rules) {
		this._rules = rules;
	},
	rule(selector, css) {
		css = css || {};
		let rule = new Rule({selector, css});
		this.rules.push(rule);
		return rule;
	},
	subrule(rule, selector, css) {
		return this.rule(selector).chain(subrule => {
			subrule.cssText = rule.cssText;
			subrule.css = css;
		});
	},
	ruleset(selector, f) {
		var ruleset = new RuleSet({selector});
		this.rules.push(ruleset);
		ruleset.stylesheet.chain(f);
		return ruleset;
	},
	toString() {
		return this.rules.map(rule => rule.string).filter(s => !!s).join("\n");
	},
});

module.exports = {Stylesheet, Rule, RuleSet};
