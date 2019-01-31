//	@ghasemkiani/wdom

const xutil = require("@ghasemkiani/wdom/xutil");
const base = require("@ghasemkiani/wdom/base");
const document = require("@ghasemkiani/wdom/document");
const node = require("@ghasemkiani/wdom/node");
const text = require("@ghasemkiani/wdom/text");
const comment = require("@ghasemkiani/wdom/comment");
const element = require("@ghasemkiani/wdom/element");
const script = require("@ghasemkiani/wdom/js/script");
const stylesheet = require("@ghasemkiani/wdom/css/stylesheet");
const style = require("@ghasemkiani/wdom/css/style");
const rule = require("@ghasemkiani/wdom/css/rule");
const ruleset = require("@ghasemkiani/wdom/css/ruleset");

module.exports = {
	xutil,
	base,
	document,
	node,
	text,
	comment,
	element,
	js: {script},
	css: {stylesheet, style, rule, ruleset},
};
