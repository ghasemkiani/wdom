//	@ghasemkiani/wdom/base

import {cutil} from "@ghasemkiani/base";
import {serializable} from "@ghasemkiani/base";

const base = cutil.extend({}, serializable, {
	chain(f, ...rest) {
		if (typeof f === "function") {
			f(this, ...rest);
		}
		return this;
	},
});

export {base};
