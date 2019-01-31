//	@ghasemkiani/wdom/css/stylesheet

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {Rule} = require("@ghasemkiani/wdom/css/rule");
const {base} = require("@ghasemkiani/wdom/base");

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

module.exports = {Stylesheet};
