//	@ghasemkiani/wdom/css/stylesheet

import {Obj} from "@ghasemkiani/base";
import {cutil} from "@ghasemkiani/base";
import {xutil} from "../xutil.js";
import {base} from "../base.js";
import {Style} from "./style.js";

class RuleSet extends cutil.mixin(Obj, base) {}
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

class Instruction extends cutil.mixin(Obj, base) {}
cutil.extend(Instruction.prototype, {
	//
});

class Rule extends cutil.mixin(Instruction, base) {}
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

class Stylesheet extends cutil.mixin(Obj, base) {}
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
	instruction(string) {
		let instruction = new Instruction({string});
		this.rules.push(instruction);
		return instruction;
	},
	toString() {
		return this.rules.map(rule => rule.string).filter(s => !!s).join("\n");
	},
});

export {Stylesheet, Rule, RuleSet};
