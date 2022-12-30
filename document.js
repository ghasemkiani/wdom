//	@ghasemkiani/wdom/document

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {xutil} from "./xutil.js";
import {base} from "./base.js";
import {WNode} from "./node.js";
import {WElement} from "./element.js";
import {WText} from "./text.js";
import {WComment} from "./comment.js";

class WDocument extends cutil.mixin(Obj, base) {
	static {
		cutil.extend(this.prototype, {
			defaultMime: "text/html",
			_window:null,
			_document: null,
			preamble: "",
			_root: null,
			ns: xutil.NS_HTML,
		});
	}
	getWindow() {
		return cutil.global().window;
	}
	get window() {
		if(!this._window) {
			this._window = this.getWindow();
		}
		return this._window;
	}
	set window(window) {
		this._window = window;
		this.document = window.document;
	}
	get document() {
		if(!this._document) {
			this._document = this.window.document;
		}
		return this._document;
	}
	set document(document) {
		this._document = document;
		this.root = this.wrap(document.documentElement);
	}
	get root() {
		if(!this._root && this.document) {
			this.root = this.wrap(this.document.documentElement);
		}
		return this._root;
	}
	set root(root) {
		this._root = root;
	}
	toString() {
		let text = this.preamble;
		if(this.root) {
			text += this.root.string;
		}
		return text;
	}
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
				let wn = this.wrap(child);
				wn.parent = wnode;
				wnode.wnodes.push(wn);
			}
		}
		return wnode;
	}
	c(tag, f) {
		let res = WElement.parseTag(tag);
		return this.wrap(this.document.createElement(res.tag)).chain(res.f).chain(f);
	}
	cx(...rest) {
		let [tag, ns, f] = rest;
		if (rest.length === 2 && typeof ns === "function") {
			f = ns;
			ns = null;
		}
		if (cutil.isNil(ns)) {
			ns = this.ns;
		}
		let res = WElement.parseTag(tag);
		return this.wrap(this.document.createElementNS(ns, res.tag)).chain(res.f).chain(f);
	}
	cc(tag, f) {
		return this.cx(tag, this.root?.ns || xutil.NS_HTML, f);
	}
	ch(tag, f) {
		return this.cx(tag, xutil.NS_HTML).chain(f);
	}
	cg(tag, f) {
		return this.cx(tag, xutil.NS_SVG).chain(f);
	}
	cm(tag, f) {
		return this.cx(tag, xutil.NS_MATHML).chain(f);
	}
	t(text, f) {
		return this.wrap(this.document.createTextNode(text)).chain(f);
	}
	comment(text, f) {
		return this.wrap(this.document.createComment(text)).chain(f);
	}
	stringAll(wnodes) {
		if(!wnodes) {
			wnodes = [];
		} else if(!Array.isArray(wnodes)) {
			wnodes = [wnodes];
		}
		return (wnodes || []).map(wnode => cutil.asString(wnode)).join("");
	}
	textAll(wnodes) {
		if(!wnodes) {
			wnodes = [];
		} else if(!Array.isArray(wnodes)) {
			wnodes = [wnodes];
		}
		return wnodes.map(wnode => wnode.toText()).join("");
	}
	clone(wnode) {
		return this.cloneAll([wnode])[0];
	}
	cloneAll(wnodes) {
		if(!wnodes) {
			wnodes = [];
		} else if(!Array.isArray(wnodes)) {
			wnodes = [wnodes];
		}
		let dummy = this.c("dummy");
		dummy.node.innerHTML = this.stringAll(wnodes);
		dummy = this.wrap(dummy.node);
		return dummy.wnodes.slice(0);
	}
}

export {WDocument};
