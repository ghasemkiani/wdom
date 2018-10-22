//	@ghasemkiani/wdom/document

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {base} = require("@ghasemkiani/wdom/base");
const {WNode} = require("@ghasemkiani/wdom/node");
const {WElement} = require("@ghasemkiani/wdom/element");
const {WText} = require("@ghasemkiani/wdom/text");

class WDocument extends cutil.mixin(Base, base) {}
cutil.extend(WDocument.prototype, {
	_window:null,
	get window() {
		if(!this._window) {
			this._window = global;
		}
		return this._window;
	},
	set window(window) {
		this._window = window;
	},
	_document: null,
	get document() {
		if(!this._document) {
			this._document = this.window.document;
		}
		return this._document;
	},
	set document(document) {
		this._document = document;
		this.root = this.wrap(document.documentElement);
	},
	root: null,
	wrap(node) {
		let Type;
		switch (node.nodeType) {
			case this.ELEMENT_NODE: Type = WElement; break;
			case this.ELEMENT_NODE: Type = WElement; break;
			case this.ELEMENT_NODE: Type = WElement; break;
			case this.ELEMENT_NODE: Type = WElement; break;
		}
		return new Type({node});
	},
	t(text) {
		return this.wrap(this.document.createTextNode(text));
	},
	c(tag, ns) {
		return this.wrap(this.document.createElementNS(ns, tag));
	},
});

module.exports = {WDocument};
