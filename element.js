//	@ghasemkiani/wdom/element

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {WNode} = require("@ghasemkiani/wdom/node");
const {xutil} = require("@ghasemkiani/wdom/xutil");

class WElement extends WNode {
	get wnodes() {
		if(!this._wnodes) {
			this._wnodes = [];
		}
		return this._wnodes;
	}
	set wnodes(wnodes) {
		this._wnodes = wnodes;
	}
	get innerString() {
		return this.toInnerString();
	}
	toString() {
		// return this.node.outerHTML;
		let s = "";
		s += `<${this.tag}`;
		let xmlnsUsed = false;
		if (!cutil.isNil(this.ns) && (!this.parent || (this.parent.ns !== this.ns))) {
			s += ` xmlns="${this.ns}"`;
			xmlnsUsed = true;
		}
		for(let {name, value} of this.node.attributes) {
			if(!/^xmlns$/i.test(name) || !xmlnsUsed) {
				s += ` ${name}="${xutil.escape(value)}"`;
			}
		}
		if(this.empty && this.wnodes.length === 0) {
			s += `/>`;
		} else {
			s += `>`;
			for(let wnode of this.wnodes) {
				s += wnode.string;
			}
			s += `</${this.tag}>`;
		}
		return s;
	}
	toInnerString() {
		return this.wnodes.map(wnode => wnode.string).join("");
	}
	remove(wnode) {
		var index = this.wnodes.indexOf(wnode);
		if (index >= 0) {
			this.node.removeChild(wnode.node);
			this.wnodes.splice(index, 1);
			wnode.parent = null;
		}
		return wnode;
	}
	append(wnode) {
		if(wnode.parent) {
			wnode.parent.remove(wnode);
		}
		this.node.appendChild(wnode.node);
		wnode.parent = this;
		this.wnodes.push(wnode);
		return wnode;
	}
	appendAll(wnodes) {
		if(!wnodes) {
			wnodes = [];
		} else if(!Array.isArray(wnodes)) {
			wnodes = [wnodes];
		}
		return wnodes.map(wnode => this.append(wnode));
	}
	cl() {
		while(this.wnodes.length > 0) {
			this.remove(this.wnodes[0]);
		}
		return this;
	}
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
	}
	c(tag, f) {
		let wnode = this.wdocument.c(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
	cx(tag, ns, f) {
		let wnode = this.wdocument.cx(tag, ns);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
	ch(tag, f) {
		let wnode = this.wdocument.ch(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
	cg(tag, f) {
		let wnode = this.wdocument.cg(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
	cm(tag, f) {
		let wnode = this.wdocument.cm(tag);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
	t(text, f) {
		let wnode = this.wdocument.t(text);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
	comment(text, f) {
		let wnode = this.wdocument.comment(text);
		this.append(wnode);
		wnode.chain(f);
		return this;
	}
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
	}
	css(...rest) {
		if(rest.length === 1) {
			if(cutil.isObject(rest[0])) {
				let map = cutil.asObject(rest[0]);
				for(let [name, value] of Object.entries(map)) {
					name = xutil.toCamelCase(name);
					this.node.style[name] = value;
				}
			} else {
				let name = cutil.asString(rest[0]);
				name = xutil.toCamelCase(name);
				return this.node.style[name];
			}
		} else if(rest.length > 1) {
			let [name, value] = rest;
			name = xutil.toCamelCase(name);
			this.node.style[name] = value;
		}
		return this;
	}
	get ns() {
		return this.node.namespaceURI;
	}
	set ns(ns) {
		// This property is read-only.
		this.node.namespaceURI = ns;
	}
	get tag() {
		return this.node.tagName;
	}
	set tag(tag) {
		// This property is read-only.
		this.node.tagName = tag;
	}
	get name() {
		return this.node.localName;
	}
	set name(name) {
		// This property is read-only.
		this.node.localName = name;
	}
	get empty() {
		if(cutil.isNil(this._empty)) {
			if(!this.ns || this.ns === xutil.NS_HTML) {
				this._empty = /^(base|link|meta|hr|br|wbr|img|source|param|track|area|input|col|frame|embed|keygen|basefont|isindex)$/i.test(this.tag);
			}
		}
		return this._empty;
	}
	set empty(empty) {
		this._empty = empty;
	}
	toText() {
		return this.wnodes.map(wnode => wnode.toText()).join("");
	}
}
cutil.extend(WElement.prototype, {
	kind: "element",
	_wnodes: null,
	_empty: null,
});

module.exports = {WElement};
