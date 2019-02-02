//	@ghasemkiani/wdom/document

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {base} = require("@ghasemkiani/wdom/base");
const {WNode} = require("@ghasemkiani/wdom/node");
const {WElement} = require("@ghasemkiani/wdom/element");
const {WText} = require("@ghasemkiani/wdom/text");
const {WComment} = require("@ghasemkiani/wdom/comment");

let parseTag = s => {
	let res = {
		tag: "",
		id: "",
		classList: [],
		cssList: [],
		attrList: [],
		text: "",
	};
	cutil.asString(s)
	.replace(/^([^$#.[{]*)/, tag => {
		res.tag = tag;
		return "";
	})
	.replace(/\{([^{]*)\}/g, (match, css) => {
		res.cssList = res.cssList.concat(css.split(/;/g).filter(bi => !!bi).map(bi => /^([^:]*):?(.*)$/.exec(bi).slice(1, 3)));
		return "";
	})
	.replace(/\[([^[]*)\]/g, (match, attr) => {
		res.attrList = res.attrList.concat(attr.split(/,/g).filter(bi => !!bi).map(bi => /^([^=]*)=?(.*)$/.exec(bi).slice(1, 3)));
		return "";
	})
	.replace(/#([^$#.[{]*)/g, (match, id) => {
		res.id = id;
		return "";
	})
	.replace(/\.([^$#.\[{]*)/g, (match, cls) => {
		res.classList.push(cls);
		return "";
	})
	.replace(/\$(.*)$/g, (match, text) => {
		res.text = text;
		return "";
	});
	return {
		tag: res.tag,
		f: wnode => {
			if(res.id) {
				wnode.attr("id", res.id);
			}
			if(res.classList.length > 0) {
				wnode.attr("class", res.classList.join(" "));
			}
			if(res.cssList.length > 0) {
				res.cssList.forEach(css => wnode.css(css[0], css[1]));
			}
			if(res.attrList.length > 0) {
				res.attrList.forEach(attr => wnode.attr(attr[0], attr[1]));
			}
			if(res.text) {
				wnode.t(res.text);
			}
		},
	};
};

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
		let res = parseTag(tag);
		return this.wrap(this.document.createElement(res.tag)).chain(res.f).chain(f);
	},
	cx(tag, ns, f) {
		let res = parseTag(tag);
		return this.wrap(this.document.createElementNS(ns, res.tag)).chain(res.f).chain(f);
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
