const assert = require("assert");

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const {WDocument} = require("@ghasemkiani/wdom/document");

describe("jsdom", () => {
	it("just a test", function () {
		const {window} = new JSDOM();
		let wdocument = new WDocument({window})
		console.log(wdocument.root.string);
		console.log(wdocument.root.wnodes[0].string);
		console.log(wdocument.root.wnodes[1].string);
	});
});
