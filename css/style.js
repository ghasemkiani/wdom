//	@ghasemkiani/wdom/css/style

const {EventEmitter} = require("events");

const {Base} = require("@ghasemkiani/commonbase/base");
const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {xutil} = require("@ghasemkiani/wdom/xutil");
const {base} = require("@ghasemkiani/wdom/base");

class Style extends cutil.mixin(Base, base) {
	get(k) {
		k = xutil.toCamelCase(k);
		return this[k];
	}
	set(k, v) {
		k = xutil.toCamelCase(k);
		if (cutil.isNil(v)) {
			this.del(k);
		} else {
			this[k] = v;
		}
		return this;
	}
	del(k) {
		k = xutil.toCamelCase(k);
		delete this[k];
		return this;
	}
	setAll(css) {
		for(let [k, v] of Object.entries(Object(css))) {
			this.set(k, v);
		}
		return this;
	}
	toString() {
		let keys = Object.keys(new EventEmitter());
		return Object.entries(this).filter(([k, v]) => (keys.indexOf(k) < 0)).map(([k, v]) => cutil.isNil(v) ? "" : xutil.toDashed(k) + ":" + v + ";").join("");
	}
	fromString(s) {
		s = cutil.asString(s);
		for(let part of s.split(";")) {
			var bi = /^([^:]*):(.*)$/.exec(part);
			if (bi) {
				let [match, k, v] = bi;
				this.set(k.trim(), v.trim());
			}
		}
		return this;
	}
	clear() {
		for(let k of Object.keys(this)) {
			this.del(k);
		}
		return this;
	}
}
cutil.extend(Style.prototype, {
	//
});

module.exports = {Style};
