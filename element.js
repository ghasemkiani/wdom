//	@ghasemkiani/wdom/element

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {Script} = require("@ghasemkiani/wdom/js/script");

class WElement extends WNode {}
cutil.extend(WElement.prototype, {
	kind: "element",
	_wnodes: null,
	get wnodes() {
		if(!this._wnodes) {
			this._wnodes = [];
		}
		return this._wnodes;
	},
	set wnodes(wnodes) {
		this._wnodes = wnodes;
	},
	toString() {
		return this.node.outerHTML;
	},
	remove(wnode) {
		var index = this.wnodes.indexOf(wnode);
		if (index >= 0) {
			this.node.removeChild(wnode.node);
			this.wnodes.splice(index, 1);
			wnode.parent = null;
		}
		return wnode;
	},
	append(wnode) {
		if(wnode.parent) {
			wnode.parent.remove(wnode);
		}
		this.node.appendChild(wnode.node);
		wnode.parent = this;
		this.wnodes.push(wnode);
		return wnode;
	},
	cl() {
		while(this.wnodes.length > 0) {
			this.remove(this.wnodes[0]);
		}
		return this;
	},
	insertBefore(wnode, wnode1) {
		if(wnode.parent) {
			wnode.parent.remove(wnode);
		}
		this.node.insertBefore(wnode.node, (wnode1 && wnode1.node) || null);
		wnode.parent = this;
		var index = this.wnodes.indexOf(wnode1);
		if (index >= 0) {
			this.wnodes.splice(index, 0, wnode);
		} else {
			this.wnodes.push(wnode);
		}
		this.node.appendChild(wnode.node);
		wnode.parent = this;
		this.wnodes.push(wnode);
		return wnode;
	},
	c(tag, f) {
		let wnode = this.wdocument.c(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	cx(tag, ns, f) {
		let wnode = this.wdocument.cx(tag, ns);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	ch(tag, f) {
		let wnode = this.wdocument.ch(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	cs(tag, f) {
		let wnode = this.wdocument.cs(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	cm(tag, f) {
		let wnode = this.wdocument.cm(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	t(text, f) {
		let wnode = this.wdocument.t(text);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	comment(text, f) {
		let wnode = this.wdocument.comment(text);
		this.append(wnode);
		wnode.chain(f);
		return this;
	},
	cssText(g, f) {
		return this.t(g, f);
	},
	jsText(g, f) {
		return this.t(new Script().chain(g).toString(), f);
	},
	attr(...rest) {
		if(rest.length === 1) {
			if(cutil.isObject(rest[0])) {
				let map = cutil.asObject(rest[0]);
				for(let [name, value] of Object.entries(map)) {
					this.node.setAttribute(name, value);
				}
			} else {
				let name = cutil.asString(rest[0]);
				return this.node.hasAttribute(name) ? this.node.getAttribute(name) : null;
			}
		} else if(rest.length > 1) {
			let [name, value] = rest;
			this.node.setAttribute(name, value);
		}
		return this;
	},
	get ns() {
		return this.node.namespaceURI;
	},
	set ns(ns) {
		// This property is read-only.
		this.node.namespaceURI = ns;
	},
	get tag() {
		return this.node.tagName;
	},
	set tag(tag) {
		// This property is read-only.
		this.node.tagName = tag;
	},
	_empty: null,
	get empty() {
		if(cutil.isNil(this._empty)) {
			if(!this.ns || this.ns === xutil.NS_HTML) {
				this._empty = /^(base|link|meta|hr|br|wbr|img|source|param|track|area|input|col|frame|embed|keygen|basefont|isindex)$/i.test(this.tag);
			}
		}
		return this._empty;
	},
	set empty(empty) {
		this._empty = empty;
	},
});

module.exports = {WElement};
