//	@ghasemkiani/wdom/text

import {cutil} from "@ghasemkiani/base";
import {WNode} from "./node.js";

class WText extends WNode {
	get text() {
		return this.node.data;
	}
	set text(text) {
		// Is this writable?
		this.node.data = text;
	}
	toString() {
		return this.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	toText() {
		return this.text;
	}
}
cutil.extend(WText.prototype, {
	kind: "text",
});

export {WText};
