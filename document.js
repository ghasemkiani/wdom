//	@ghasemkiani/wdom/document

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {base} = require("@ghasemkiani/wdom/base");
const {WNode} = require("@ghasemkiani/wdom/node");
const {WElement} = require("@ghasemkiani/wdom/element");
const {WText} = require("@ghasemkiani/wdom/text");
const {WComment} = require("@ghasemkiani/wdom/comment");

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
		this.document = window.document;
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
	preamble: "",
	root: null,
	toString() {
		let text = this.preamble;
		if(this.root) {
			text += this.root.string;
		}
		return text;
	},
	wrap(node) {
		let wdocument = this;
		const {Node} = this.window;
		let Type;
		switch (node.nodeType) {
			case Node.ELEMENT_NODE: Type = WElement; break;
			case Node.TEXT_NODE: Type = WText; break;
			case Node.COMMENT_NODE: Type = WComment; break;
			default: Type = WNode; break;
		}
		let wnode = new Type({wdocument, node});
		if(node.nodeType === Node.ELEMENT_NODE) {
			for(let child of node.childNodes) {
				wnode.wnodes.push(this.wrap(child));
			}
		}
		return wnode;
	},
	c(tag, f) {
		return this.wrap(this.document.createElement(tag)).chain(f);
	},
	cx(tag, ns, f) {
		return this.wrap(this.document.createElementNS(ns, tag)).chain(f);
	},
	ch(tag, f) {
		return this.cx(tag, xutil.NS_HTML).chain(f);
	},
	cs(tag, f) {
		return this.cx(tag, xutil.NS_SVG).chain(f);
	},
	cm(tag, f) {
		return this.cx(tag, xutil.NS_MATHML).chain(f);
	},
	t(text, f) {
		return this.wrap(this.document.createTextNode(text)).chain(f);
	},
	comment(text, f) {
		return this.wrap(this.document.createComment(text)).chain(f);
	},
});

module.exports = {WDocument};
