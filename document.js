//	@ghasemkiani/wdom/document

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
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
	root: null,
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
	t(text) {
		return this.wrap(this.document.createTextNode(text));
	},
	c(tag, ns) {
		return this.wrap(this.document.createElementNS(ns, tag));
	},
});

module.exports = {WDocument};
