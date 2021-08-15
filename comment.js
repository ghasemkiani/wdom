//	@ghasemkiani/wdom/comment

import {cutil} from "@ghasemkiani/base";
import {WNode} from "./node.js";

class WComment extends WNode {
	get text() {
		return this.node.data;
	}
	set text(text) {
		// Is this writable?
		this.node.data = text;
	}
	toString() {
		return "<!--" + this.node.data + "-->";
	}
}
cutil.extend(WComment.prototype, {
	kind: "comment",
});

export {WComment};
