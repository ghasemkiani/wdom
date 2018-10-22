const assert = require("assert");

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const {WDocument} = require("@ghasemkiani/wdom/document");

describe("jsdom", () => {
	it("just a test", function () {
		const {window} = new JSDOM();
		const {document} = window;
		console.log(document.documentElement.outerHTML);
		let wdocument = new WDocument({document})
		console.log(wdocument);
		console.log(wdocument.toString());
		console.log(window.Node.PROCESSING_INSTRUCTION_NODE);
	});
});
