//	@ghasemkiani/wdom/node

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {base} from "./base.js";

class WNode extends cutil.mixin(Obj, base) {
	del() {
		if(this.parent) {
			this.parent.remove(this);
		}
		return this;
	}
	toText() {
		return "";
	}
}
cutil.extend(WNode.prototype, {
	wdocument: null,
	kind: "node",
	node: null,
	parent: null,
});

export {WNode};
