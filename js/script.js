//	@ghasemkiani/wdom/js/script

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {base} from "../base.js";

class Script extends cutil.mixin(Obj, base) {}
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

export {Script};
