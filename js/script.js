//	@ghasemkiani/wdom/js/script

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {base} = require("@ghasemkiani/wdom/base");

class Script extends cutil.mixin(Base, base) {}
cutil.extend(Script.prototype, {
	mime: "application/javascript",
	_items: null,
	get items() {
		if(!this._items) {
			this._items = [];
		}
		return this._items;
	},
	set items(items) {
		this._items = items;
	},
	add(f, arg) {
		this.items.push([f, arg]);
		return this;
	},
	toString() {
		return this.items.map(([f, arg]) => `(${f.toString()})(${!cutil.isUndefined(arg) ? JSON.stringify(arg) : ""});\n`).join("\n");
	},
});

module.exports = {Script};
